import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActiveUserService} from "../active-user.service";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../../model/user/user";
import {UserRoleEnum} from "../../enums/user-role.enum";
import {Set} from "typescript-collections"

@Injectable()
export class UserGetterService {

  constructor(private http: HttpClient,
              private activeUserService: ActiveUserService) {
  }

  loadUsers() {
    // TODO: load users from endpoint
    return this.http.get(environment.getUsersUri)
      .pipe(map( (response) => {
          return this.parseUsersJson(response);
        }
      ));
  }

  loadActiveUser() {
    // TESTING ONLY
    this.loadUsers()
      .subscribe(
        (users) => {
          console.log(users);
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
