import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {SandboxInstance} from "../../model/sandbox/sandbox-instance";
import {SandboxInstanceDTO} from "../../model/DTOs/sandbox-instance/sandbox-instance-dto";
import {map} from "rxjs/operators";
import {SandboxInstanceMapper} from "../mappers/sandbox-instance-mapper.service";

@Injectable()
export class SandboxInstanceFacade {

  private readonly trainingInstancesUriExtension = 'training-instances/';
  private readonly sandboxInstancesUriExtension = 'sandbox-instances/';
  private readonly  poolsUriExtension = 'pools/';

  private readonly poolsEndpointUri = environment.sandboxRestBasePath + this.poolsUriExtension;
  private readonly  trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstancesUriExtension;

  constructor(private http: HttpClient,
              private sandboxInstanceMapper: SandboxInstanceMapper) {
  }

  getSandboxesInPool(poolId: number): Observable<SandboxInstance[]> {
    return this.http.get<SandboxInstanceDTO[]>(this.poolsEndpointUri + poolId + '/sandboxes/')
      .pipe(map(sandboxDTOs => this.sandboxInstanceMapper.mapSandboxInstanceDTOsToSandboxInstances(sandboxDTOs)));
  }

  /**
   * Sends request to create pool for sandboxes of selected training instance
   * @param trainingInstanceId
   */
  createPool(trainingInstanceId: number): Observable<number> {
    return this.http.post<number>(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.poolsUriExtension}`,
      null);
  }

  /**
   * Sends request to allocate all sandboxes for selected training instance
   * @param trainingInstanceId
   */
  allocateSandboxes(trainingInstanceId: number ): Observable<any> {
    return this.http.post(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      null);
  }

  deleteSandbox(trainingInstanceId: number, sandboxId: number): Observable<any> {
    return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      {
        params: {sandboxIds: sandboxId.toString()}
      }
    );
  }

  deleteSandboxes(trainingInstanceId: number, sandboxIds: [number]): Observable<any> {
    return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      {
        params: {sandboxIds: sandboxIds.toString()}
      }
    );
  }

  allocateSandbox(trainingInstanceId: number, count: number = 1): Observable<any> {
    let params = new HttpParams();
    params = params.append('count', count.toString());
    return this.http.post(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      {},
      {
        params: params
      });
  }}
