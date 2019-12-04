import {User} from 'kypo2-auth';
import {Kypo2Table} from 'kypo2-table';
import {BehaviorSubject, Observable} from 'rxjs';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {PaginatedResourceService} from './paginated-resource.service';

export abstract class UserAssignService extends PaginatedResourceService {

  protected isLoadingAssignedSubject = new BehaviorSubject<boolean>(false);
  isLoadingAssigned$: Observable<boolean> = this.isLoadingAssignedSubject.asObservable();

  /**
   * List of users already assigned to the resource
   */
  abstract assignedUsers$: Observable<PaginatedResource<User[]>>;

  /**
   * Search for users available to assign to resource
   * @param resourceId
   * @param filter
   */
  abstract getAvailableToAssign(resourceId: number, filter: string): Observable<PaginatedResource<User[]>>;

  /**
   * Get users already assigned to the resource
   * @contract MUST update assignedUsers observable.
   * @param resourceId
   * @param pagination
   * @param filter
   */
  abstract getAssigned(resourceId: number, pagination: RequestedPagination, filter: string): Observable<PaginatedResource<User[]>>;

  /**
   * Assigns all users to resource
   * @param resourceId
   * @param users
   */
  abstract assign(resourceId: number, users: User[]): Observable<any>;

  /**
   * Unassigns all users from resource
   * @param resourceId
   * @param users
   */
  abstract unassign(resourceId: number, users: User[]): Observable<any>;

  /**
   * Assigns and unassigns users from/to resource at the same time
   * @param resourceId
   * @param additions
   * @param removals
   */
  abstract update(resourceId: number, additions: User[], removals: User[]): Observable<any>;
}
