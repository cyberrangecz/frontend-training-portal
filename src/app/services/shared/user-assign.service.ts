import {Observable} from 'rxjs';
import {User} from 'kypo2-auth';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {Kypo2Table} from 'kypo2-table';

export abstract class UserAssignService {
  /**
   * Table of users already assigned to the resource
   */
  assignedUsers$: Observable<Kypo2Table<User>>;

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
