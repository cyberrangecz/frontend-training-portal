import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class SandboxDefinitionLoaderService {

  constructor(private http: HttpClient) {
  }

  getSandboxDefsByUserId(userId: number): Observable<SandboxDefinition[]> {
    return this.http.get(environment.getSandboxDefsUri)
      .pipe(map(response =>
      this.parseSandboxDefs(response)));
  }

  private parseSandboxDefs(sandboxDefsJson): SandboxDefinition[] {
    const sandboxDefs: SandboxDefinition[] =[];

    sandboxDefsJson.sandbox_defs.forEach(sandboxJson => {
      const sandbox = new SandboxDefinition(
        sandboxJson.id,
        sandboxJson.title,
        this.getAuthorIds(sandboxJson.authors));
      sandboxDefs.push(sandbox);
    });
    return sandboxDefs;
  }

  private getAuthorIds(authorsJson) {
    const ids: number[] = [];
    authorsJson.forEach(author => ids.push(author.id));
    return ids;
  }
}
