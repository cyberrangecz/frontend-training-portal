import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {UserRestResource} from '../../model/DTOs/other/user-rest-resource-dto';
import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';
import {PaginatedResource} from '../../model/table/other/paginated-resource';

@Injectable()
/**
 * Maps user DTOs to user model
 */
export class UserMapper {

  /**
   * Maps paginated users dto on internal model
   * @param resource dto to be mapped on internal model
   */
  mapUserDTOsToUsers(resource: UserRestResource): PaginatedResource<User[]> {
    const elements = resource.content.map(userDTO => User.fromDTO(userDTO));
    const pagination = new Kypo2Pagination(
      resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(elements, pagination);
  }
}
