import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UserMapper} from '../mappers/user.mapper.service';
import {UserRestResource} from '../../model/DTOs/other/user-rest-resource-dto';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {UserRow} from '../../model/table-adapters/user-table-row';
import {Filter} from '../../model/utils/filter';
import {ParamsMerger} from '../../model/http/params/params-merger';
import {FilterParams} from '../../model/http/params/filter-params';
import {User} from 'kypo2-auth';

@Injectable()
/**
 * Service to abstract communication with User endpoint.
 */
export class UserFacade {
  readonly trainingDefinitionUriExtension = 'training-definitions/';
  readonly trainingInstanceUrlExtension = 'training-instances/';
  readonly trainingDefsEndpointUri = environment.trainingRestBasePath + this.trainingDefinitionUriExtension;
  readonly trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstanceUrlExtension;


  constructor(private http: HttpClient,
              private userMapper: UserMapper) {
  }

  getOrganizersNotInTI(trainingInstanceId: number, pagination: RequestedPagination, filters: Filter[] = []): Observable<PaginatedResource<User[]>> {
    const params = ParamsMerger.merge([PaginationParams.createTrainingsPaginationParams(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingInstancesEndpointUri + trainingInstanceId}/organizers-not-in-training-instance`,
      { params: params})
      .pipe(
        map(resp => this.userMapper.mapPaginatedDTOToUsersTable(resp))
      );
  }

  getDesignersNotInTD(trainingDefinitionId: number, pagination: RequestedPagination, filters: Filter[] = []): Observable<PaginatedResource<User[]>> {
    const params = ParamsMerger.merge([PaginationParams.createTrainingsPaginationParams(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingDefsEndpointUri + trainingDefinitionId}/designers-not-in-training-definition`,
      { params: params })
      .pipe(
        map(resp => this.userMapper.mapPaginatedDTOToUsersTable(resp))
      );
  }

  getAuthors(trainingDefinitionId: number, pagination: RequestedPagination, filters: Filter[] = []): Observable<PaginatedResource<User[]>> {
    const params = ParamsMerger.merge([PaginationParams.createTrainingsPaginationParams(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingDefsEndpointUri + trainingDefinitionId}/authors`,
      { params: params})
      .pipe(
        map(resp => this.userMapper.mapPaginatedDTOToUsersTable(resp))
      );
  }

  getOrganizers(trainingInstanceId: number, pagination: RequestedPagination, filters: Filter[] = []): Observable<PaginatedResource<User[]>> {
    const params = ParamsMerger.merge([PaginationParams.createTrainingsPaginationParams(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingInstancesEndpointUri + trainingInstanceId}/organizers`,
      { params: params})
      .pipe(
        map(resp => this.userMapper.mapPaginatedDTOToUsersTable(resp))
      );
  }

  updateAuthors(trainingDefinitionId: number, additions: number[], removals: number[]): Observable<any> {
    return this.http.put(`${this.trainingDefsEndpointUri + trainingDefinitionId}/authors`, {}, {
      params: new HttpParams()
        .set('authorsAddition', additions.toString())
        .set('authorsRemoval', removals.toString())
    });
  }

  updateOrganizers(trainingInstanceId: number, additions: number[], removals: number[]): Observable<any> {
    return this.http.put(`${this.trainingInstancesEndpointUri + trainingInstanceId}/organizers`, {}, {
      params: new HttpParams()
        .set('organizersAddition', additions.toString())
        .set('organizersRemoval', removals.toString())
    });
  }
}
