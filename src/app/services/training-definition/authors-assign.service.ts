import {Injectable} from '@angular/core';
import { User} from 'kypo2-auth';
import {Kypo2Table} from 'kypo2-table';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {UsersTableCreator} from '../../model/table-adapters/users-table-creator';
import {UserNameFilters} from '../../model/utils/user-name-filters';
import {UserFacade} from '../facades/user-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {UserAssignService} from '../shared/user-assign.service';

@Injectable()
export class AuthorsAssignService extends UserAssignService {

  constructor(private userFacade: UserFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private assignedUsersSubject: Subject<Kypo2Table<User>> = new Subject();
  assignedUsers$: Observable<Kypo2Table<User>> = this.assignedUsersSubject.asObservable();

  assign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, users.map(user => user.id), [])
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Adding authors')})
      );
  }

  unassign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, [], users.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting authors')})
      );
  }

  getAssigned(resourceId: number, pagination: RequestedPagination, filter: string = null): Observable<PaginatedResource<User[]>> {
    return this.userFacade.getAuthors(resourceId, pagination, UserNameFilters.create(filter))
      .pipe(
        tap(paginatedUsers => this.assignedUsersSubject.next(UsersTableCreator.create(paginatedUsers))),
        tap({error: err => this.errorHandler.display(err, 'Fetching authors')})
      );
  }

  getAvailableToAssign(resourceId: number, filter: string = null): Observable<PaginatedResource<User[]>> {
    const paginationSize = 25;
    return this.userFacade.getDesignersNotInTD(
      resourceId,
      new RequestedPagination(0, paginationSize, 'familyName', 'asc'),
      UserNameFilters.create(filter))
      .pipe(
        tap(_ => _,
          err => this.errorHandler.display(err, 'Fetching designers')
        )
      );
  }

  update(resourceId: number, additions: User[], removals: User[]): Observable<any> {
    return this.userFacade.updateAuthors(resourceId, additions.map(user => user.id), removals.map(user => user.id))
      .pipe(
        tap(_ => _,
            err => this.errorHandler.display(err, 'Updating authors')
        )
      );
  }
}
