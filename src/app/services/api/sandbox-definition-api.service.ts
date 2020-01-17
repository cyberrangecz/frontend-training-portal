import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {SandboxDefinitionDTO} from '../../model/DTOs/sandbox-definition/sandbox-definition-dto';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {SandboxDefinitionMapper} from '../../model/mappers/sandbox-definition/sandbox-definition-mapper';
import {PaginationMapper} from '../../model/mappers/pagination-mapper';

/**
 * Service abstracting http communication with sandbox definition endpoints.
 */
@Injectable()
export class SandboxDefinitionApi {

  private readonly sandboxDefsEndpoint = environment.sandboxRestBasePath + 'definitions/';

  constructor(private http: HttpClient) {
  }

  /**
   * Sends http request to retrieve all sandbox definitions
   */
  getAll(): Observable<SandboxDefinition[]> {
    return this.http.get<DjangoResourceDTO<SandboxDefinitionDTO>>(this.sandboxDefsEndpoint, { headers: this.createDefaultHeaders() })
      .pipe(
        map(response => SandboxDefinitionMapper.fromDTOs(response.results))
      );
  }

  /**
   * Sends http request to retrieve all sandbox definitions on specified page of a pagination
   */
  getAllPaginated(pagination?: RequestedPagination): Observable<PaginatedResource<SandboxDefinition>> {
    return this.http.get<DjangoResourceDTO<SandboxDefinitionDTO>>(this.sandboxDefsEndpoint,
      {
        headers: this.createDefaultHeaders(),
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new PaginatedResource<SandboxDefinition>(
            SandboxDefinitionMapper.fromDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          )
        )
      );
  }

  /**
   * Sends http request to retrieve sandbox definition by id
   * @param id id of the sandbox definition that should be retrieved
   */
  get(id: number): Observable<SandboxDefinition> {
    return this.http.get<SandboxDefinitionDTO>(this.sandboxDefsEndpoint + id, { headers: this.createDefaultHeaders() })
      .pipe(
        map(response => SandboxDefinitionMapper.fromDTO(response))
      );
  }

  /**
   * Sends http request to delete sandbox definition
   * @param id id of sandbox definition which should be removed
   */
  delete(id: number): Observable<any> {
    return this.http.delete(this.sandboxDefsEndpoint + id);
  }

  /**
   * Sends http request to create new sandbox definition from gitlab repo
   * @param gitlabUrl url of a gitlab repository containing sandbox definition
   * @param revision gitlab revision
   */
  create(gitlabUrl: string, revision: string): Observable<any> {
    return this.http.post(this.sandboxDefsEndpoint, { url: gitlabUrl, rev: revision});
  }

  private createDefaultHeaders() {
    return new HttpHeaders({'Accept': 'application/json'});
  }
}
