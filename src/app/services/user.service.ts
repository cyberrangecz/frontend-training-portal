import {Injectable} from "@angular/core";
import {User} from "../model/user/user";
import Set from "typescript-collections/dist/lib/Set";
import {UserRoleEnum} from "../enums/user-role.enum";

@Injectable()
export class UserService {

  private _activeUser: User;

  getUserRole(): Set<UserRoleEnum> {
    return this._activeUser === undefined ? new Set<UserRoleEnum>() : this._activeUser.roles;
  }

  isAuthenticated(): boolean {
    // TODO: connect to OIDC later
    return true;
  }
}
