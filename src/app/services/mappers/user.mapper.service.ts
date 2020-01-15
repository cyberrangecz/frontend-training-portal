import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {UserRestResource} from '../../model/DTOs/other/user-rest-resource-dto';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {JavaApiPaginationMapper} from './java-api-pagination-mapper';

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
    const pagination = JavaApiPaginationMapper.map(resource.pagination);
    return new PaginatedResource(elements, pagination);
  }
}
