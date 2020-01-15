import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';

export class DjangoApiPaginationMapper {

  /**
   * Maps DJANGO API pagination to our internal model
   * NOTE: Page index is reduced by one because it starts with 0 internally, while with 1 in API
   * @param paginatedDTO paginated resource dto
   */
  static map(paginatedDTO: DjangoResourceDTO<any>): Kypo2Pagination {
    return new Kypo2Pagination(
      paginatedDTO.page - 1, // we need to subtract one because DJANGO API starts with 1 while internally, we start with 0
      paginatedDTO.count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
  }
}
