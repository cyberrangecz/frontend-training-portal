import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user/user";
import {map} from "rxjs/operators";
import {UserMapper} from "../mappers/user.mapper.service";
import {UserInfoDTO} from "../../model/DTOs/user/user-info-dto";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {RoleDTO} from "../../model/DTOs/user/role-dto";
import {UserRefDTO} from '../../model/DTOs/user/user-ref-dto';
import {UserInfo} from 'angular-oauth2-oidc';
import {UserBasicDTO} from '../../model/DTOs/user/user-basic-dto';

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
    return this.http.get<UserBasicDTO[]>(this.trainingDefsEndpointUri + 'organizers')
      .pipe(map(resp => this.userMapper.mapUserBasicDTOsToOrganizerUsers(resp)));
  }

  /**
   * Retrieves all designer logins
   */
  getDesigners(): Observable<User[]> {
    return this.http.get<UserBasicDTO[]>(this.trainingDefsEndpointUri + 'designers')
      .pipe(map(resp => this.userMapper.mapUserBasicDTOsToDesignerUsers(resp)));
  }

  getUserInfo(): Observable<User> {
    return this.http.get<UserInfoDTO>(environment.userAndGroupRestBasePath + 'users/info')
      .pipe(map(resp => this.userMapper.mapUserInfoDTOToUser(resp)))
  }
}
