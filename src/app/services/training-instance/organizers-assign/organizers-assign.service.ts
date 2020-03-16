import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {KypoPagination, KypoRequestedPagination} from 'kypo-common';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {KypoPaginatedResource} from 'kypo-common';
import {UserNameFilters} from '../../../model/utils/user-name-filters';
import {UserApi} from '../../api/user-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {environment} from '../../../../environments/environment';
import {Kypo2UserAssignService} from 'kypo2-user-assign';

/**
 * Organizer implementation of UserAssignService from user assign library.
 * Provides context, concrete data and API connection to generic service user assignment service
 */
@Injectable()
export class OrganizersAssignService extends Kypo2UserAssignService {

  constructor(private userFacade: UserApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastAssignedPagination: KypoRequestedPagination;
  private lastAssignedFilter: string;
  private assignedUsersSubject: BehaviorSubject<KypoPaginatedResource<User>> = new BehaviorSubject(this.initSubject());

  /**
   * Currently assigned users (organizers)
   */
  assignedUsers$: Observable<KypoPaginatedResource<User>> = this.assignedUsersSubject.asObservable();

  /***
   * Assigns organizer to a resource (creates association)
   * @param resourceId id of resource (training instance for example)
   * @param users list of users (organizers) to assign to a resource
   */
  assign(resourceId: number, users: User[]): Observable<any> {
   const userIds = users.map(user => user.id);
    return this.callApiToAssign(resourceId, userIds);
  }

  assignSelected(resourceId: number): Observable<any> {
    const userIds = this.selectedUsersToAssignSubject$.getValue().map(user => user.id);
    return this.callApiToAssign(resourceId, userIds);
  }

  /**
   * Gets organizers assigned to specific resource and updates related observables or handles error
   * @param resourceId id of resource associated with organizers
   * @param pagination requested pagination
   * @param filter username filter which should be applied on organizers
   */
  getAssigned(resourceId: number, pagination: KypoRequestedPagination, filter: string = null): Observable<KypoPaginatedResource<User>> {
    this.clearSelectedAssignedUsers();
    this.lastAssignedPagination = pagination;
    this.lastAssignedFilter = filter;
    this.hasErrorSubject$.next(false);
    this.isLoadingAssignedSubject.next(true);
    return this.userFacade.getOrganizers(resourceId, pagination, UserNameFilters.create(filter))
      .pipe(
        tap(paginatedUsers => {
            this.assignedUsersSubject.next(paginatedUsers);
            this.isLoadingAssignedSubject.next(false);
          },
          err => {
            this.errorHandler.emit(err, 'Fetching organizers');
            this.isLoadingAssignedSubject.next(false);
            this.hasErrorSubject$.next(true);
          })
      );
  }

  /**
   * Gets all organizers which are not already associated with selected resource or handles error.
   * @param resourceId id of selected resource
   * @param filter username filter which should be applied on organizers
   */
  getAvailableToAssign(resourceId: number, filter: string = null): Observable<KypoPaginatedResource<User>> {
    const paginationSize = 25;
    return this.userFacade.getOrganizersNotInTI(
      resourceId,
      new KypoRequestedPagination(0, paginationSize, 'familyName', 'asc'),
      UserNameFilters.create(filter))
      .pipe(
        tap({error: err => this.errorHandler.emit(err, 'Fetching organizers')})
      );
  }

  /**
   * Deletes association between selected organizers and resource and refreshes observable of already assigned organizers or handles error
   * @param resourceId id of selected resource
   * @param users organizers whose association should be deleted
   */
  unassign(resourceId: number, users: User[]): Observable<any> {
    const userIds = users.map(user => user.id);
    return this.callApiToUnassign(resourceId, userIds);
  }

  unassignSelected(resourceId: number): Observable<any> {
    const userIds = this.selectedAssignedUsersSubject$.getValue().map(user => user.id);
    return this.callApiToUnassign(resourceId, userIds);
  }

  /**
   * Adds and removes associations between selected organizers and resource. Refreshes observable of already
   * assigned organizers or handles error
   * @param resourceId id of selected resource
   * @param additions users to assign to selected resource
   * @param removals users whose association with resource should be removed
   */
  update(resourceId: number, additions: User[], removals: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, additions.map(user => user.id), removals.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.emit(err, 'Updating organizers')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private initSubject(): KypoPaginatedResource<User> {
    return new KypoPaginatedResource([], new KypoPagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }

  private callApiToAssign(resourceId: number, userIds: number[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, userIds, [])
      .pipe(
        tap(_ => this.clearSelectedUsersToAssign(),
          err => this.errorHandler.emit(err, 'Assigning organizers to training instance')),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private callApiToUnassign(resourceId: number, userIds: number[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, [], userIds)
      .pipe(
        tap(_ => this.clearSelectedAssignedUsers(),
          err => this.errorHandler.emit(err, 'Deleting organizers from training instance')),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }
}
