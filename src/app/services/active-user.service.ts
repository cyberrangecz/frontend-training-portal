import {Injectable} from "@angular/core";
import {User} from "../model/user/user";
import {UserRoleEnum} from "../enums/user-role.enum";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

/**
 * Service maintaining active (logged in user)
 */
@Injectable()
export class ActiveUserService {

  private _activeUser: User;

  private _onActiveUserChangedSubject: Subject<number> = new Subject<number>();
  /**
   * Observable of active user changes (when user logs out or logs in)
   * @type {Observable<number>}
   */
  onActiveUserChanged: Observable<number> = this._onActiveUserChangedSubject.asObservable();

  /**
   * Decides whether active user has designer role
   * @returns {boolean} true if active user has organizer role, false otherwise
   */
  isDesigner(): boolean {
    return this._activeUser === undefined ? false : this._activeUser.roles.contains(UserRoleEnum.Designer);
  }

  /**
   * Decides whether active user has organizer role
   * @returns {boolean} true if active user has organizer role, false otherwise
   */
  isOrganizer(): boolean {
    return this._activeUser === undefined ? false : this._activeUser.roles.contains(UserRoleEnum.Organizer);
  }

  /**
   * Decides whether active user has trainee role
   * @returns {boolean} true if active user has trainee role, false otherwise
   */
  isTrainee(): boolean {
    return this._activeUser === undefined ? false : this._activeUser.roles.contains(UserRoleEnum.Trainee);
  }

  /**
   * Decides whether active user is authenticated
   * @returns {boolean} true if active user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    // TODO: connect to OIDC later
    return this._activeUser !== undefined;
  }

  /**
   * Returns active user
   */
  getActiveUser(): User {
    return this._activeUser;
  }

  /**
   * Returns authorization header of the active user
   */
  getActiveUserAuthorizationHeader(): string {
    return 'token';
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
