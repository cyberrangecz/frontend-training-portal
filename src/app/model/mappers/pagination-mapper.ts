import {Paginated} from '../DTOs/other/paginated';
import {KypoPagination} from 'kypo-common';

export class PaginationMapper {

  static fromJavaAPI(paginationDTO: Paginated): KypoPagination {
    return new KypoPagination(
      paginationDTO.number,
      paginationDTO.number_of_elements,
      paginationDTO.size,
      paginationDTO.total_elements,
      paginationDTO.total_pages);
  }
}
