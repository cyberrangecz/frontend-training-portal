import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class InfoLevelLoaderService {

  constructor(private http: HttpClient) {
  }
}
