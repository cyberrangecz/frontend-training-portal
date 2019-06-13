import {HttpParams} from "@angular/common/http";

export class PaginationParams {

  static createPaginationParams(page: number, size: number, sort: string, sortDir: string): HttpParams {
    return new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      .set("sort", sort + ',' + sortDir);
  }

}
