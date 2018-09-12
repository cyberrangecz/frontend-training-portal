import {HttpParams} from "@angular/common/http";

export class PaginationParams {

  static createPaginationParams(page: number, size: number, sort: string, sortDir: string): HttpParams {
    return new HttpParams()
      .set("page", page)
      .set("size", size)
      .set("sort", sort)
      .set("sort-direction", sortDir)
  }

}
