import {Injectable} from '@angular/core';
import { User} from 'kypo2-auth';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {UserNameFilters} from '../../../model/utils/user-name-filters';
import {UserFacade} from '../../facades/user-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {Kypo2UserAssignService} from 'kypo2-user-assign';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AuthorsAssignService extends Kypo2UserAssignService {

  constructor(private userFacade: UserFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastAssignedPagination: RequestedPagination;
  private lastAssignedFilter: string;
  private assignedUsersSubject: BehaviorSubject<PaginatedResource<User[]>> = new BehaviorSubject(this.initSubject());
  assignedUsers$: Observable<PaginatedResource<User[]>> = this.assignedUsersSubject.asObservable();

  assign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, users.map(user => user.id), [])
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Adding authors')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  unassign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, [], users.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting authors from training definition')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  getAssigned(resourceId: number, pagination: RequestedPagination, filter: string = null): Observable<PaginatedResource<User[]>> {
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
            this.totalLengthSubject.next( paginatedUsers.pagination.totalElements);
        },
      err => {
          this.errorHandler.display(err, 'Fetching authors');
          this.isLoadingAssignedSubject.next(false);
          this.hasErrorSubject$.next(true);
        })
      );
  }

  getAvailableToAssign(resourceId: number, filter: string = null): Observable<PaginatedResource<User[]>> {
    const paginationSize = 25;
    return this.userFacade.getDesignersNotInTD(
      resourceId,
      new RequestedPagination(0, paginationSize, 'familyName', 'asc'),
      UserNameFilters.create(filter))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Fetching designers')}),
      );
  }

  update(resourceId: number, additions: User[], removals: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, additions.map(user => user.id), removals.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Updating authors')}),
        switchMap(_ => this.getAssigned(resourceId, this.lastAssignedPagination, this.lastAssignedFilter))
      );
  }

  private initSubject(): PaginatedResource<User[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
