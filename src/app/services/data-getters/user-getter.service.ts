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
export class UserGetterService {

  constructor(private http: HttpClient,
              private activeUserService: ActiveUserService) {
  }

  loadUsers() {
    return this.http.get(environment.getUsersUri)
      .pipe(map( (response) => {
          return this.parseUsersJson(response);
        }
      ));
  }

  loadUserById(userId: number): Observable<User> {
    return this.loadUsers().pipe(map(users => {
      const filtered = users.filter(user => user.id === userId);
      return filtered ? filtered[0] : null;
    }));
  }

  loadUsersByIds(usersIds: number[]): Observable<User[]> {
    return this.loadUsers().pipe(map(users => {
      return users.filter(user => usersIds.includes(user.id))
    }));
  }

  loadUsersByRoles(roles: UserRoleEnum[]) {
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

  private parseUsersJson(usersJson): User[] {
    const users: User[] = [];
    usersJson.users.forEach(user => {
      users.push(
        new User(user.id, user.name, this.getUserRoles(user.roles)))
    });
    return users;
  }

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
