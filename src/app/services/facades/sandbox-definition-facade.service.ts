import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {SandboxDefinition} from "../../model/sandbox/sandbox-definition";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {SandboxDefinitionCreateDTO} from "../../model/DTOs/sandbox-definition/sandbox-definition-create-dto";
import {UploadService} from "../shared/upload.service";
import {SandboxDefinitionMapperService} from "../mappers/sandbox-definition-mapper.service";
import {SandboxDefinitionDTO} from "../../model/DTOs/sandbox-definition/sandbox-definition-dto";
import {of} from "rxjs";

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
  getSandboxDefs(): Observable<SandboxDefinition[]> {
    const  headers = new  HttpHeaders().set("Accept", "application/json");
    return this.http.get<SandboxDefinitionDTO[]>(this.sandboxDefsEndpoint, { headers: headers })
      .pipe(map(response =>
      this.sandboxDefinitionMapper.mapSandboxDefinitionsDTOToSandboxDefinitions(response)));
  }


  /**
   * Retrieves sandbox by its id
   * @param {number} id id of sandbox which should be retrieved
   * @returns {Observable<SandboxDefinition>} Observable of retrieved sandbox definition, null if no sandbox definition with such id is found
   */
  getSandboxDefById(id: number): Observable<SandboxDefinition> {
    const  headers = new  HttpHeaders().set("Accept", "application/json");
    return this.http.get<SandboxDefinitionDTO>(this.sandboxDefsEndpoint + id, { headers: headers })
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
