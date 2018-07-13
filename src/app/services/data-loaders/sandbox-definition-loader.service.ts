import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SandboxDefinitionLoaderService {

  constructor(private http: HttpClient) {

  }
}
