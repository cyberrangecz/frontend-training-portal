import {RequestedPagination} from '../DTOs/other/requested-pagination';

export class LoadTableEvent {
  pagination: RequestedPagination;

  constructor(pagination: RequestedPagination = null) {
    this.pagination = pagination;
  }
}
