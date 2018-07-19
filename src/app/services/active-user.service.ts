import {Injectable} from "@angular/core";
import {User} from "../model/user/user";
import {UserRoleEnum} from "../enums/user-role.enum";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class ActiveUserService {

  private _activeUser: User;

  private _onActiveUserChangedSubject: Subject<number> = new Subject<number>();
  onActiveUserChanged: Observable<number> = this._onActiveUserChangedSubject.asObservable();

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

  /**
   * Sets active user
   * @param {User} user user to be set as active
   */
  setActiveUser(user: User) {
    this._activeUser = user;
    this._onActiveUserChangedSubject.next(user.id);
  }
}
