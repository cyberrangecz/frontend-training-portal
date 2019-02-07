import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SandboxInstanceDTO} from "../../model/DTOs/sandbox-instance/sandbox-instance-dto";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class SandboxInstanceFacade {

  constructor(private http: HttpClient) {
  }

  getSandboxesInPool(poolId: number): Observable<SandboxInstanceDTO[]> {
    return this.http.get<SandboxInstanceDTO[]>(environment.poolsEndpointUri + poolId + '/sandboxes/');
  }
}
