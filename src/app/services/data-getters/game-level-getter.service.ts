import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameLevelGetterService {

  constructor(private http: HttpClient) {
  }
}
