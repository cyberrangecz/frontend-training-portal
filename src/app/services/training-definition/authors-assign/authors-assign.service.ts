import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {UserNameFilters} from '../../../model/utils/user-name-filters';
import {UserApi} from '../../api/user-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {Kypo2UserAssignService} from 'kypo2-user-assign';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../environments/environment';

/**
 * Designer/Author implementation of UserAssignService from user assign library.
 * Provides context, concrete data and API connection to generic service user assignment service
 */
@Injectable()
export class AuthorsAssignService extends Kypo2UserAssignService {

  constructor(private userFacade: UserApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastAssignedPagination: RequestedPagination;
  private lastAssignedFilter: string;
  private assignedUsersSubject: BehaviorSubject<PaginatedResource<User>> = new BehaviorSubject(this.initSubject());
  /**
   * Currently assigned users (authors)
   */
  assignedUsers$: Observable<PaginatedResource<User>> = this.assignedUsersSubject.asObservable();

  /***
   * Assigns designer to a resource (creates association)
   * @param resourceId id of resource (training definition for example)
   * @param users list of users (designers) to assign to a resource
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
   * Deletes association between selected authors and resource and refreshes observable of already assigned organizers or handles error
   * @param resourceId id of selected resource
   * @param users authors whose association should be deleted
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
   * Gets authors of specific resource and updates related observables or handles error
   * @param resourceId id of resource associated with authors
   * @param pagination requested pagination
   * @param filter username filter which should be applied on authors
   */
  getAssigned(resourceId: number, pagination: RequestedPagination, filter: string = null): Observable<PaginatedResource<User>> {
    this.clearSelectedAssignedUsers();
    this.lastAssignedPagination = pagination;
    this.lastAssignedFilter = filter;
    this.hasErrorSubject$.next(false);
    this.isLoadingAssignedSubject.next(true);
    return this.userFacade.getAuthors(resourceId, pagination, UserNameFilters.create(filter))
      .pipe(
        tap(
          paginatedUsers => {
            this.assignedUsersSubject.next(paginatedUsers);
            this.isLoadingAssignedSubject.next(false);
        },
      err => {
          this.errorHandler.emit(err, 'Fetching authors');
          this.isLoadingAssignedSubject.next(false);
          this.hasErrorSubject$.next(true);
        })
      );
  }

  /**
   * Gets all designers which are not already authors of a selected resource or handles error.
   * @param resourceId id of selected resource
   * @param filter username filter which should be applied on designers
   */
  getAvailableToAssign(resourceId: number, filter: string = null): Observable<PaginatedResource<User>> {
    const paginationSize = 25;
    return this.userFacade.getDesignersNotInTD(
      resourceId,
      new RequestedPagination(0, paginationSize, 'familyName', 'asc'),
      UserNameFilters.create(filter))
      .pipe(
        tap({error: err => this.errorHandler.emit(err, 'Fetching designers')}),
      );
  }

  /**
   * Adds and removes associations between selected designers/authors and resource. Refreshes observable of already assigned organizers or handles error
   * @param resourceId id of selected resource
   * @param additions designers to assign to selected resource
   * @param removals authors whose association with resource should be removed
   */
  update(resourceId: number, additions: User[], removals: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, additions.map(user => user.id), removals.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.emit(err, 'Updating authors')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private callApiToAssign(resourceId: number, userIds: number[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, userIds, [])
      .pipe(
        tap(_ => this.clearSelectedUsersToAssign(),
          err => this.errorHandler.emit(err, 'Adding authors')),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private callApiToUnassign(resourceId: number, usersIds: number[]) {
    return this.userFacade.updateAuthors(resourceId, [], usersIds)
      .pipe(
        tap(_ => this.clearSelectedAssignedUsers(),
          err => this.errorHandler.emit(err, 'Deleting authors from training definition')),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }


  private initSubject(): PaginatedResource<User> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
