import {Injectable} from '@angular/core';
import {UserRestResource} from '../../model/DTOs/other/user-rest-resource-dto';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {UserRow} from '../../model/table-adapters/user-table-row';
import {TableAdapterPagination} from '../../model/table-adapters/table-adapter-pagination';
import {User} from 'kypo2-auth';

@Injectable()
/**
 * Maps user DTOs to user model
 */
export class UserMapper {

  mapPaginatedDTOToUsersTable(resource: UserRestResource): PaginatedResource<User[]> {
    const tableData = resource.content.map(userDTO => User.fromDTO(userDTO));
    const tablePagination = new TableAdapterPagination(
      resource.pagination.number,
      resource.pagination.number_of_elements,
      resource.pagination.size,
      resource.pagination.total_elements,
      resource.pagination.total_pages);
    return new PaginatedResource(tableData, tablePagination);
  }
}
