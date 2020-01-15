import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';
import {Paginated} from '../../model/DTOs/other/paginated';

export class JavaApiPaginationMapper {
  static map(paginationDTO: Paginated): Kypo2Pagination {
    return new Kypo2Pagination(
      paginationDTO.number,
      paginationDTO.number_of_elements,
      paginationDTO.size,
      paginationDTO.total_elements,
      paginationDTO.total_pages);
  }
}
