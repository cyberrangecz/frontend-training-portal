import {Injectable} from "@angular/core";
import {User} from "../model/user/user";
import {UserRoleEnum} from "../enums/user-role.enum";

@Injectable()
export class ActiveUserService {

  private _activeUser: User;

  isDesigner(): boolean {
    return this._activeUser === undefined ? false : this._activeUser.roles.contains(UserRoleEnum.Designer);
  }

  isOrganizer(): boolean {
    return this._activeUser === undefined ? false : this._activeUser.roles.contains(UserRoleEnum.Organizer);
  }

  isTrainee(): boolean {
    return this._activeUser === undefined ? false : this._activeUser.roles.contains(UserRoleEnum.Trainee);
  }

  isAuthenticated(): boolean {
    // TODO: connect to OIDC later
    return true;
  }

  getActiveUser(): User {
    return this._activeUser;
  }

  setActiveUser(user: User) {
    this._activeUser = user;
  }
}
