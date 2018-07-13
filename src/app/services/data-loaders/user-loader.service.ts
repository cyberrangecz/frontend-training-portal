import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserLoaderService {

  constructor(private http: HttpClient) {
  }
}
