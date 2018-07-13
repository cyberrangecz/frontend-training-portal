import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SandboxInstanceLoaderService {

  constructor(private http: HttpClient) {
  }
}
