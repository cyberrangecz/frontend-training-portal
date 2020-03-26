import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {KypoRequestedPagination} from 'kypo-common';
import {UserRestResource} from '../../model/DTOs/other/user-rest-resource-dto';
import {FilterParams} from '../../model/http/params/filter-params';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {KypoParamsMerger} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoFilter} from 'kypo-common';
import {PaginationMapper} from '../../model/mappers/pagination-mapper';
import {UserMapper} from '../../model/mappers/user/user-mapper';

/**
 * Service abstracting http communication with user related endpoints.
 */
@Injectable()
export class UserApi {
  readonly trainingDefinitionUriExtension = 'training-definitions';
  readonly trainingInstanceUrlExtension = 'training-instances';
  readonly trainingDefsEndpointUri = environment.trainingRestBasePath + this.trainingDefinitionUriExtension;
  readonly trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstanceUrlExtension;

  constructor(private http: HttpClient) {
  }

  /**
   * Sends http request to retrieve organizers not associated with provided  training instance
   * @param trainingInstanceId id of a training instance not associated with retrieved organizers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getOrganizersNotInTI(trainingInstanceId: number,
                       pagination: KypoRequestedPagination,
                       filters: KypoFilter[] = []): Observable<KypoPaginatedResource<User>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/organizers-not-in-training-instance`,
      { params: params})
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  /**
   * Sends http request to retrieve designers not associated with provided training definition
   * @param trainingDefinitionId id of a training definition not associated with retrieved designers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getDesignersNotInTD(trainingDefinitionId: number,
                      pagination: KypoRequestedPagination,
                      filters: KypoFilter[] = []): Observable<KypoPaginatedResource<User>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingDefsEndpointUri}/${trainingDefinitionId}/designers-not-in-training-definition`,
      { params: params })
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  /**
   * Sends http request to retrieve authors of a training definition
   * @param trainingDefinitionId id of a training definition associated with retrieved authors
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getAuthors(trainingDefinitionId: number,
             pagination: KypoRequestedPagination,
             filters: KypoFilter[] = []): Observable<KypoPaginatedResource<User>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingDefsEndpointUri}/${trainingDefinitionId}/authors`,
      { params: params})
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  /**
   * Sends http request to retrieve organizers of a training instance
   * @param trainingInstanceId id of a training instance associated with retrieved organizers
   * @param pagination requested pagination
   * @param filters requested filtering
   */
  getOrganizers(trainingInstanceId: number,
                pagination: KypoRequestedPagination,
                filters: KypoFilter[] = []): Observable<KypoPaginatedResource<User>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<UserRestResource>(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/organizers`,
      { params: params})
      .pipe(
        map(resp => this.paginatedUsersFromDTO(resp))
      );
  }

  private paginatedUsersFromDTO(dto: UserRestResource): KypoPaginatedResource<User> {
    return new KypoPaginatedResource<User>(
      UserMapper.fromDTOs(dto.content),
      PaginationMapper.fromJavaAPI(dto.pagination)
    );
  }

  /**
   * Sends http request to create and remove associations between training definition and designers
   * @param trainingDefinitionId id of training definition whose associations shall be altered
   * @param additions ids of designers which should become associated with training definition (become its authors)
   * @param removals  ids of designers which should stop being associated with training definition
   */
  updateAuthors(trainingDefinitionId: number, additions: number[], removals: number[]): Observable<any> {
    return this.http.put(`${this.trainingDefsEndpointUri}/${trainingDefinitionId}/authors`, {}, {
      params: new HttpParams()
        .set('authorsAddition', additions.toString())
        .set('authorsRemoval', removals.toString())
    });
  }

  /**
   * Sends http request to create and remove associations between training instance and organizers
   * @param trainingInstanceId id of training instance whose associations shall be altered
   * @param additions ids of organizers which should become associated with training instance
   * @param removals  ids of organizers which should stop being associated with training instance
   */
  updateOrganizers(trainingInstanceId: number, additions: number[], removals: number[]): Observable<any> {
    return this.http.put(`${this.trainingInstancesEndpointUri}/${trainingInstanceId}/organizers`, {}, {
      params: new HttpParams()
        .set('organizersAddition', additions.toString())
        .set('organizersRemoval', removals.toString())
    });
  }
}
