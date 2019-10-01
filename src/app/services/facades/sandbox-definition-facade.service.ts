import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {SandboxDefinition} from '../../model/sandbox/sandbox-definition';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {SandboxDefinitionMapperService} from '../mappers/sandbox-definition-mapper.service';
import {SandboxDefinitionDTO} from '../../model/DTOs/sandbox-definition/sandbox-definition-dto';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';

/**
 * Service to abstract from sandbox definition endpoint.
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
  getAll(): Observable<SandboxDefinition[]> {
    return this.http.get<DjangoResourceDTO<SandboxDefinitionDTO>>(this.sandboxDefsEndpoint, { headers: this.createDefaultHeaders() })
      .pipe(map(response =>
      this.sandboxDefinitionMapper.mapSandboxDefinitionsDTOToSandboxDefinitions(response.results)));
  }

  getAllPaginated(pagination: RequestedPagination): Observable<PaginatedResource<SandboxDefinitionTableRow[]>> {
    return this.http.get<DjangoResourceDTO<SandboxDefinitionDTO>>(this.sandboxDefsEndpoint,
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
  getById(id: number): Observable<SandboxDefinition> {
    return this.http.get<SandboxDefinitionDTO>(this.sandboxDefsEndpoint + id, { headers: this.createDefaultHeaders() })
      .pipe(map(response => this.sandboxDefinitionMapper.mapSandboxDefinitionDTOToSandboxDefinition(response)));
  }

  /**
   * Sends request to remove sandbox definition with provided id
   * @param {number} id id of sandbox definition which should be removed
   */
  delete(id: number): Observable<any> {
    return this.http.delete(this.sandboxDefsEndpoint + id);
  }

  add(gitlabUrl: string, revision: string): Observable<any> {
    return this.http.post(this.sandboxDefsEndpoint, { url: gitlabUrl, rev: revision});
  }

  private createDefaultHeaders() {
    return new HttpHeaders({'Accept': 'application/json'});
  }
}
