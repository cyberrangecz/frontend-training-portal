export class TableAdapterPagination {
  page: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;


  constructor(page: number, numberOfElements: number, size: number, totalElements: number, totalPages: number) {
    this.page = page;
    this.numberOfElements = numberOfElements;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }
}
