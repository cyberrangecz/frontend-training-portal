import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SandboxInstanceFacade {

  constructor(private http: HttpClient) {
  }
}
