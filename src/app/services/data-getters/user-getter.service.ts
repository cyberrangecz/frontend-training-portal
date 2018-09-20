import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActiveUserService} from "../active-user.service";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../../model/user/user";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {Set} from "typescript-collections"
import {Observable} from "rxjs/internal/Observable";

@Injectable()
/**
 * Service to abstract communication with User endpoint.
 * Can retrieve users based on various parameters.
 */
export class UserGetterService {

  constructor(private http: HttpClient,
              private activeUserService: ActiveUserService) {
  }

  /**
   * Loads all users
   * @returns {Observable<User[]>} Observable of created users list based on received response
   */
  loadUsers() {
    return this.http.get(environment.usersEndpointUri)
      .pipe(map( (response) => {
          return this.parseUsersJson(response);
        }
      ));
  }

  /**
   * Loads user with specified id
   * @param {number} userId id of user which should be retrieved
   * @returns {Observable<User>} Observable of retrieved user, null if user with such id does not exist
   */
  loadUserById(userId: number): Observable<User> {
    return this.loadUsers().pipe(map(users => {
      const filtered = users.filter(user => user.id === userId);
      return filtered ? filtered[0] : null;
    }));
  }

  /**
   * Loads users matching list of ids
   * @param {number[]} usersIds ids of users which should be retrieved
   * @returns {Observable<User[]>} Observable of retrieved users list, empty list if no ids are matching
   */
  loadUsersByIds(usersIds: number[]): Observable<User[]> {
    return this.loadUsers().pipe(map(users => {
      return users.filter(user => usersIds.includes(user.id))
    }));
  }

  /**
   * Loads users having provided roles
   * @param {UserRoleEnum[]} roles list of roles which users must have
   * @returns {Observable<User[]>} Observable of list of users having all provided roles
   */
  loadUsersByRoles(roles: UserRoleEnum[]): Observable<User[]> {
    return this.loadUsers().pipe(map(users => {
      return users.filter(user =>
      roles.every(role =>
        user.roles.contains(role)))
    }));
  }

  loadActiveUser() {
    // TESTING ONLY
    this.loadUsers()
      .subscribe(
        (users) => {
          this.activeUserService.setActiveUser(users[0]);
        }
      );
  }

  /**
   * Parses JSON from HTTP response
   * @param usersJson JSON from HTTP response
   * @returns {User[]} List of users created based on received JSON
   */
  private parseUsersJson(usersJson): User[] {
    const users: User[] = [];
    usersJson.forEach(user => {
      users.push(
        new User(user.id, user.name, this.getUserRoles(user.roles)))
    });
    return users;
  }

  /**
   * Parses user roles JSON
   * @param rolesJson JSON with user roles
   * @returns {Set<UserRoleEnum>} Set of all user roles
   */
  private getUserRoles(rolesJson): Set<UserRoleEnum> {
    const roles: Set<UserRoleEnum> = new Set<UserRoleEnum>();
    rolesJson.forEach(role => {
      if (role.name === 'designer') {
        roles.add(UserRoleEnum.Designer)
      }
      if (role.name === 'organizer') {
        roles.add(UserRoleEnum.Organizer)
      }
      if (role.name === 'trainee') {
        roles.add(UserRoleEnum.Trainee);
      }
    });
    return roles;
  }
}
