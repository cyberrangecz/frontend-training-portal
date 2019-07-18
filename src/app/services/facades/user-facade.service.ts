import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {UserMapper} from "../mappers/user.mapper.service";
import {UserBasicDTO} from '../../model/DTOs/user/user-basic-dto';
import {User} from 'kypo2-auth';

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
}
