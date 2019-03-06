import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user/user";
import {map} from "rxjs/operators";
import {UserMapper} from "../mappers/user.mapper.service";
import {UserBasicInfoDTO} from "../../model/DTOs/user/user-basic-info-dto";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {RoleDTO} from "../../model/DTOs/user/role-dto";
import {UserRefDTO} from '../../model/DTOs/user/user-ref-dto';
import {UserInfo} from 'angular-oauth2-oidc';
import {UserInfoDTO} from '../../model/DTOs/user/user-info-dto';

@Injectable()
/**
 * Service to abstract communication with User endpoint.
 * Can retrieve users based on various parameters.
 */
export class UserFacade {
  readonly trainingDefinitionUriExtension = 'training-definitions/';
  readonly trainingDefsEndpointUri = environment.trainingRestBasePath + this.trainingDefinitionUriExtension;

  constructor(private http: HttpClient,
              private userMapper: UserMapper) {
  }

  /**
   * Retrieves all organizer logins
   */
  getOrganizers(): Observable<User[]> {
    return this.http.get<UserInfoDTO[]>(this.trainingDefsEndpointUri + 'organizers')
      .pipe(map(resp => this.userMapper.mapUserInfoDTOsToOrganizerUsers(resp)));
  }

  /**
   * Retrieves all designer logins
   */
  getDesigners(): Observable<User[]> {
    return this.http.get<UserInfoDTO[]>(this.trainingDefsEndpointUri + 'designers')
      .pipe(map(resp => this.userMapper.mapUserInfoDTOsToDesignerUsers(resp)));
  }

  getUserInfo(): Observable<User> {
    return this.http.get<UserBasicInfoDTO>(environment.userAndGroupRestBasePath + 'users/basic-info')
      .pipe(map(resp => this.userMapper.mapUserBasicInfoDTOToUser(resp)))
  }

  getUserRolesByGroups(groupIds: number[]): Observable<UserRoleEnum[]> {
    const params = new HttpParams().append('ids', groupIds.toString());
    return this.http.get<[RoleDTO]>(environment.trainingRestBasePath + 'roles/roles-of-groups',
      { params: params })
      .pipe(map(resp => this.userMapper.mapRoleDTOsToRoles(resp)));
  }
}
