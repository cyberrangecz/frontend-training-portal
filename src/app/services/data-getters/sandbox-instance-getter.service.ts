import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SandboxInstanceGetterService {

  constructor(private http: HttpClient) {
  }
}
