export class RequestedPagination {
  page: number;
  size: number;
  sort: string;
  sortDir: string;

  constructor(page: number, size: number, sort: string, sortDir: string) {
    this.page = page;
    this.size = size;
    this.sort = sort;
    this.sortDir = sortDir;
  }
}
