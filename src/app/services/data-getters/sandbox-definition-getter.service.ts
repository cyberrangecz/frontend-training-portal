import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class SandboxDefinitionGetterService {

  constructor(private http: HttpClient) {
  }


  getSandboxDefs(): Observable<SandboxDefinition[]> {
    return this.http.get(environment.getSandboxDefsUri)
      .pipe(map(response =>
      this.parseSandboxDefs(response)));
  }

  getSandboxDefsByUserId(userId: number): Observable<SandboxDefinition[]> {
    return this.getSandboxDefs()
      .pipe(map(sandboxDefs =>
        sandboxDefs.filter(sandboxDef =>
        sandboxDef.authors.includes(userId))));
  }

  private parseSandboxDefs(sandboxDefsJson): SandboxDefinition[] {
    const sandboxDefs: SandboxDefinition[] =[];

    sandboxDefsJson.sandbox_defs.forEach(sandboxJson => {
      const sandbox = new SandboxDefinition(
        sandboxJson.title,
        this.parseAuthorIds(sandboxJson.authors));
      sandbox.id = sandboxJson.id;

      sandboxDefs.push(sandbox);
    });
    return sandboxDefs;
  }

  private parseAuthorIds(authorsJson) {
    const ids: number[] = [];
    authorsJson.forEach(author => ids.push(author.id));
    return ids;
  }
}
