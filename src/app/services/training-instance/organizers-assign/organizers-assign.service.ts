import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {PaginatedResource} from '../../../model/table-adapters/paginated-resource';
import {UserNameFilters} from '../../../model/utils/user-name-filters';
import {UserFacade} from '../../facades/user-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {UserAssignService} from '../../shared/user-assign.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class OrganizersAssignService extends UserAssignService {

  constructor(private userFacade: UserFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastAssignedPagination: RequestedPagination;
  private lastAssignedFilter: string;
  private assignedUsersSubject: BehaviorSubject<PaginatedResource<User[]>> = new BehaviorSubject(this.initSubject());
  assignedUsers$: Observable<PaginatedResource<User[]>> = this.assignedUsersSubject.asObservable();

  assign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, users.map(user => user.id), [])
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Assigning organizers to training instance')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  getAssigned(resourceId: number, pagination: RequestedPagination, filter: string = null): Observable<PaginatedResource<User[]>> {
    this.lastAssignedPagination = pagination;
    this.lastAssignedFilter = filter;
    this.hasErrorSubject$.next(false);
    this.isLoadingAssignedSubject.next(true);
    return this.userFacade.getOrganizers(resourceId, pagination, UserNameFilters.create(filter))
      .pipe(
        tap(paginatedUsers => {
            this.assignedUsersSubject.next(paginatedUsers);
            this.totalLengthSubject.next( paginatedUsers.pagination.totalElements);
            this.isLoadingAssignedSubject.next(false);
          },
          err => {
            this.errorHandler.display(err, 'Fetching organizers');
            this.isLoadingAssignedSubject.next(false);
            this.hasErrorSubject$.next(true);
          })
      );
  }

  getAvailableToAssign(resourceId: number, filter: string = null): Observable<PaginatedResource<User[]>> {
    const paginationSize = 25;
    return this.userFacade.getOrganizersNotInTI(
      resourceId,
      new RequestedPagination(0, paginationSize, 'familyName', 'asc'),
      UserNameFilters.create(filter))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Fetching organizers')})
      );  }

  unassign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, [], users.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting organizers from training instance')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  update(resourceId: number, additions: User[], removals: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, additions.map(user => user.id), removals.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Updating organizers')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private initSubject(): PaginatedResource<User[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
