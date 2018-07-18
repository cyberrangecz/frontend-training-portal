import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class InfoLevelGetterService {

  constructor(private http: HttpClient) {
  }
}
