import {UserAssignService} from '../shared/user-assign.service';
import {User} from 'kypo2-auth';
import {Observable, Subject} from 'rxjs';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {UserFacade} from '../facades/user-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {tap} from 'rxjs/operators';
import {UserNameFilters} from '../../model/utils/user-name-filters';
import {UsersTableCreator} from '../../model/table-adapters/users-table-creator';
import {Injectable} from '@angular/core';

@Injectable()
export class OrganizersAssignService extends UserAssignService {

  constructor(private userFacade: UserFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private assignedUsersSubject: Subject<Kypo2Table<User>> = new Subject();
  assignedUsers$: Observable<Kypo2Table<User>> = this.assignedUsersSubject.asObservable();

  assign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, users.map(user => user.id), [])
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Assigning organizers to training instance')})
      );  }

  getAssigned(resourceId: number, pagination: RequestedPagination, filter: string): Observable<PaginatedResource<User[]>> {
    return this.userFacade.getOrganizers(resourceId, pagination, UserNameFilters.create(filter))
      .pipe(
        tap(paginatedUsers => this.assignedUsersSubject.next(UsersTableCreator.create(paginatedUsers))),
        tap({error: err => this.errorHandler.display(err, 'Fetching organizers of training instance')})
      );
  }

  getAvailableToAssign(resourceId: number, filter: string): Observable<PaginatedResource<User[]>> {
    return this.userFacade.getOrganizersNotInTI(
      resourceId,
      new RequestedPagination(0, 25, 'familyName', 'asc'),
      UserNameFilters.create(filter))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Fetching organizers')})
      );  }

  unassign(resourceId: number, users: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, [], users.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting organizers from training instance')})
      );  }

  update(resourceId: number, additions: User[], removals: User[]): Observable<any> {
    return this.userFacade.updateOrganizers(resourceId, additions.map(user => user.id), removals.map(user => user.id))
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Updating organizers')})
      );
  }

}
