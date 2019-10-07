import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/sandbox-instance';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {map} from 'rxjs/operators';
import {SandboxInstanceMapper} from '../mappers/sandbox-instance-mapper.service';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {RequestedPagination} from 'kypo2-table';
import {SandboxPoolDTO} from '../../model/DTOs/sandbox-instance/sandbox-pool-dto';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxPool} from '../../model/sandbox/sandbox-pool';
import {PaginationParams} from '../../model/http/params/pagination-params';
@Injectable()
/**
 * Service to abstract communication with sandbox instance endpoint
 */
export class SandboxInstanceFacade {

  private readonly trainingInstancesUriExtension = 'training-instances/';
  private readonly sandboxInstancesUriExtension = 'sandbox-instances/';
  private readonly  poolsUriExtension = 'pools/';

  private readonly poolsEndpointUri = environment.sandboxRestBasePath + this.poolsUriExtension;
  private readonly  trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstancesUriExtension;

  constructor(private http: HttpClient,
              private sandboxInstanceMapper: SandboxInstanceMapper) {
  }

  getPools(pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxPool[]>> {
    return this.http.get<DjangoResourceDTO<SandboxPoolDTO>>(
      this.poolsEndpointUri,
    {
        params: PaginationParams.createSandboxPaginationParams(pagination)
    }).pipe(map(response => this.sandboxInstanceMapper.mapPoolsDTOsToPools(response)));
  }

  getSandboxes(poolId: number, pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxInstance[]>> {
    return this.http.get<DjangoResourceDTO<SandboxInstanceDTO>>(this.poolsEndpointUri + poolId + '/sandboxes/',
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(map(response => this.sandboxInstanceMapper.mapSandboxInstanceDTOsToSandboxInstances(response)));
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
   * @param count
   */
  allocate(trainingInstanceId: number, count: number = 0): Observable<any> {
    let params = new HttpParams();
    if (count > 0) {
      params = new HttpParams().set('count', count.toString());
    }
    return this.http.post(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`, null,
      {params: params});
  }

  delete(trainingInstanceId: number, sandboxId: number, isHardDeleted = false): Observable<any> {
    if (!isHardDeleted) {
      return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
        {
          params: {sandboxIds: sandboxId.toString()}
        }
      );
    } else {
      return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}?hard`,
        {
          params: {sandboxIds: sandboxId.toString()}
        }
      );
    }
  }

  deleteMultiple(trainingInstanceId: number, sandboxIds: [number]): Observable<any> {
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
