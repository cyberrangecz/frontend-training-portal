import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user/user";
import {map} from "rxjs/operators";
import {UserMapper} from "../mappers/user.mapper.service";

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
      .pipe(map(resp => this.userMapper.getOrganizersFromLogins(resp)));
  }

  /**
   * Retrieves all designer logins
   */
  getDesigners(): Observable<User[]> {
    return this.http.get<string[]>(environment.trainingDefsEndpointUri + 'designers')
      .pipe(map(resp => this.userMapper.getDesignersFromLogins(resp)));
  }

}
