import {DjangoResourceDTO} from '../DTOs/other/django-resource-dto';
import {Paginated} from '../DTOs/other/paginated';
import {Pagination} from '../table/other/pagination';

export class PaginationMapper {

  /**
   * Maps DJANGO API pagination to our internal model
   * NOTE: Page index is reduced by one because it starts with 0 internally, while with 1 in API
   * @param resourceDTO paginated resource dto
   */
  static fromDjangoAPI(resourceDTO: DjangoResourceDTO<any>): Pagination {
    return new Pagination(
      resourceDTO.page - 1, // we need to subtract one because DJANGO API starts with 1 while internally, we start with 0
      resourceDTO.count,
      resourceDTO.page_size,
      resourceDTO.total_count,
      resourceDTO.page_count);
  }

  static fromJavaAPI(paginationDTO: Paginated): Pagination {
    return new Pagination(
      paginationDTO.number,
      paginationDTO.number_of_elements,
      paginationDTO.size,
      paginationDTO.total_elements,
      paginationDTO.total_pages);
  }
}
