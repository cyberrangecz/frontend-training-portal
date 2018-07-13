import {Injectable} from "@angular/core";
import {User} from "../model/user";
import Set from "typescript-collections/dist/lib/Set";
import {UserRolesEnum} from "../enums/user-roles.enum";

@Injectable()
export class UserService {

  private _activeUser: User;

  getUserRole(): Set<UserRolesEnum> {
    return this._activeUser === undefined ? new Set<UserRolesEnum>() : this._activeUser.roles;
  }

  isAuthenticated(): boolean {
    // connect to OIDC later
    return true;
  }
}
