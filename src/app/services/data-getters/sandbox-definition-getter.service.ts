import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";

@Injectable()
/**
 * Service to abstract from sandbox definition endpoint.
 * Can retrieve sandbox definition based on several parameters
 */
export class SandboxDefinitionGetterService {

  constructor(
    private http: HttpClient) {
  }

  /**
   * Retrieves all sandbox definitions
   * @returns {Observable<SandboxDefinition[]>} Observable of sandbox definitions list
   */
  getSandboxDefs(): Observable<SandboxDefinition[]> {
    return this.http.get(environment.sandboxDefsEndpointUri)
      .pipe(map(response =>
      this.parseSandboxDefs(response)));
  }

  /**
   * Retrieves all sandbox definition on specified page of a pagination
   * @param page page of pagination
   * @param size size of a page
   * @param sort attribute by which will result be sorted
   * @param sortDir sortDirection (asc, desc)
   */
  getSandboxDefsWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<SandboxDefinition[]> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get(environment.sandboxDefsEndpointUri, { params: params })
      .pipe(map(response =>
        this.parseSandboxDefs(response)));
  }

  /**
   * Retrieves sandbox by its id
   * @param {number} id id of sandbox which should be retrieved
   * @returns {Observable<SandboxDefinition>} Observable of retrieved sandbox definition, null if no sandbox definition with such id is found
   */
  getSandboxDefById(id: number): Observable<SandboxDefinition> {
    return this.getSandboxDefs().pipe(map(sandboxes => {
      const filtered = sandboxes.filter(sandbox => sandbox.id === id);
      return filtered ? filtered[0] : null;
    }));
  }

  /**
   * Parses JSON received from HTTP response
   * @param sandboxDefsJson JSON defining sandbox definitions
   * @returns {SandboxDefinition[]} List of sandbox definitions created from JSON
   */
  private parseSandboxDefs(sandboxDefsJson): SandboxDefinition[] {
    const sandboxDefs: SandboxDefinition[] =[];

    sandboxDefsJson.forEach(sandboxJson => {
      const sandbox = new SandboxDefinition(
        sandboxJson.title,
        this.parseAuthorIds(sandboxJson.authors));
      sandbox.id = sandboxJson.id;
      sandboxDefs.push(sandbox);
    });
    return sandboxDefs;
  }

  /**
   * Parses JSON defining authors of sandbox definitions
   * @param authorsJson JSON defining authors of sandbox definitions
   * @returns {number[]} List of authors ids
   */
  private parseAuthorIds(authorsJson) {
    const ids: number[] = [];
    authorsJson.forEach(author => ids.push(author.id));
    return ids;
  }


}
