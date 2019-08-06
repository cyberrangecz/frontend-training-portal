import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {SandboxDefinitionMapperService} from "../mappers/sandbox-definition-mapper.service";
import {SandboxDefinitionDTO} from "../../model/DTOs/sandbox-definition/sandbox-definition-dto";
import {TablePagination} from "../../model/DTOs/other/table-pagination";
import {PaginationHttpParams} from "kypo2-user-and-group-management/lib/model/other/pagination-http-params";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {PaginatedTable} from "../../model/table-adapters/paginated-table";
import {SandboxDefinitionTableRow} from "../../model/table-adapters/sandbox-definition-table-row";
import {SandboxPaginated} from "../../model/DTOs/other/sandbox-paginated";

/**
 * Service to abstract from sandbox definition endpoint.
 * Can retrieve sandbox definition based on several parameters
 */
@Injectable()
export class SandboxDefinitionFacade {

  private readonly sandboxDefsEndpoint = environment.sandboxRestBasePath + 'definitions/';

  constructor(private http: HttpClient,
              private sandboxDefinitionMapper: SandboxDefinitionMapperService) {
  }


  /**
   * Retrieves all sandbox definitions
   * @returns {Observable<SandboxDefinition[]>} Observable of sandbox definitions list
   */
  getSandboxDefinitions(): Observable<SandboxDefinition[]> {
    return this.http.get<SandboxDefinitionDTO[]>(this.sandboxDefsEndpoint, { headers: this.createDefaultHeaders() })
      .pipe(map(response =>
      this.sandboxDefinitionMapper.mapSandboxDefinitionsDTOToSandboxDefinitions(response)));
  }

  getSandboxDefinitionsPaginated(pagination: TablePagination): Observable<PaginatedTable<SandboxDefinitionTableRow[]>> {
    return this.http.get<SandboxPaginated<SandboxDefinitionDTO>>(this.sandboxDefsEndpoint,
      {
        headers: this.createDefaultHeaders(),
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(map(response =>
        this.sandboxDefinitionMapper.mapSandboxDefinitionDTOToSandboxDefinitionPaginated(response)));
  }

  /**
   * Retrieves sandbox by its id
   * @param {number} id id of sandbox which should be retrieved
   * @returns {Observable<SandboxDefinition>} Observable of retrieved sandbox definition, null if no sandbox definition with such id is found
   */
  getSandboxDefById(id: number): Observable<SandboxDefinition> {
    return this.http.get<SandboxDefinitionDTO>(this.sandboxDefsEndpoint + id, { headers: this.createDefaultHeaders() })
      .pipe(map(response => this.sandboxDefinitionMapper.mapSandboxDefinitionDTOToSandboxDefinition(response)));
  }

  /**
   * Sends request to remove sandbox definition with provided id
   * @param {number} id id of sandbox definition which should be removed
   */
  deleteSandboxDefinition(id: number): Observable<any> {
    return this.http.delete(this.sandboxDefsEndpoint + id);
  }

  addSandboxDefinition(gitlabUrl: string, revision: string): Observable<any> {
    return this.http.post(this.sandboxDefsEndpoint, { url: gitlabUrl, rev: revision});
  }

  private createDefaultHeaders() {
    return new HttpHeaders({'Accept': 'application/json'});
  }
}
