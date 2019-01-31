import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {of} from "rxjs";
import {SandboxDefinitionCreateDTO} from "../../model/DTOs/sandbox-definition/sandbox-definition-create-dto";
import {UploadService} from "../upload.service";

@Injectable()
/**
 * Service to abstract from sandbox definition endpoint.
 * Can retrieve sandbox definition based on several parameters
 */
export class SandboxDefinitionFacade {

  constructor(private http: HttpClient,
              private uploadService: UploadService) {
  }


  uploadSandboxDefinition(file: File): Observable<SandboxDefinitionCreateDTO> {
    return this.uploadService.uploadSandboxDefinition(environment.trainingRestBasePath + 'imports/sandbox-definitions', file);
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
    return this.http.get(environment.sandboxDefsEndpointUri + id)
      .pipe(map(response => this.parseSandboxDef(response)));
  }

  /**
   * Sends request to remove sandbox definition with provided id
   * @param {number} id id of sandbox definition which should be removed
   */
  removeSandboxDefinition(id: number): Observable<any> {
    return of(null)
    // TODO: REQUEST to remove sandbox with id
  }

  deploySandboxDefinition(id: number): Observable<any> {
    return of(null)
    // TODO: REQUEST to deploy sandbox deifiniton
  }

  /**
   * Parses JSON received from HTTP response
   * @param sandboxDefsJson JSON defining sandbox definitions
   * @returns {SandboxDefinition[]} List of sandbox definitions created from JSON
   */
  private parseSandboxDefs(sandboxDefsJson): SandboxDefinition[] {
    const sandboxDefs: SandboxDefinition[] =[];
    sandboxDefsJson.forEach(sandboxJson => {
      sandboxDefs.push(this.parseSandboxDef(sandboxJson));
    });
    return sandboxDefs;
  }

  private parseSandboxDef(sandboxDefJson): SandboxDefinition {
    const sandbox = new SandboxDefinition(
      sandboxDefJson.title,
      this.parseAuthorIds(sandboxDefJson.authors));
    sandbox.id = sandboxDefJson.id;
    return sandbox;
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
