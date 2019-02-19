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

@Injectable()
/**
 * Service to abstract communication with User endpoint.
 * Can retrieve users based on various parameters.
 */
export class UserFacade {

  constructor(private http: HttpClient,
              private userMapper: UserMapper) {
  }

  /**
   * Retrieves all organizer logins
   */
  getOrganizers(): Observable<User[]> {
    return this.http.get<string[]>(environment.trainingDefsEndpointUri + 'organizers')
      .pipe(map(resp => this.userMapper.mapLoginsToOrganizerUsers(resp)));
  }

  /**
   * Retrieves all designer logins
   */
  getDesigners(): Observable<User[]> {
    return this.http.get<string[]>(environment.trainingDefsEndpointUri + 'designers')
      .pipe(map(resp => this.userMapper.mapLoginsToDesignerUsers(resp)));
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
