import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GameLevelLoaderService {

  constructor(private http: HttpClient) {
  }
}
