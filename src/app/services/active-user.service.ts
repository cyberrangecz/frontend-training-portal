import {Injectable} from '@angular/core';
import {User} from '../model/user/user';
import {UserRoleEnum} from '../enums/user-role.enum';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {UserFacade} from './facades/user-facade.service';
import {map, switchMap} from 'rxjs/operators';

/**
 * Service maintaining active (logged in user)
 */
@Injectable()
export class ActiveUserService {

  private _activeUser: User;

  private _onActiveUserChangedSubject: Subject<User> = new Subject<User>();
  /**
   * Observable of active user changes (when user logs out or logs in)
   * @type {Observable<User>}
   */
  onActiveUserChanged: Observable<User> = this._onActiveUserChangedSubject.asObservable();

  constructor(private router: Router,
    private userFacade: UserFacade,
    private oAuthService: OAuthService) {
  }
  /**
   * Decides whether active user has designer role
   * @returns {boolean} true if active user has organizer role, false otherwise
   */
  isDesigner(): boolean {
    return !this._activeUser ? false : this._activeUser.roles.contains(UserRoleEnum.Designer);
  }

  /**
   * Decides whether active user has organizer role
   * @returns {boolean} true if active user has organizer role, false otherwise
   */
  isOrganizer(): boolean {
    return !this._activeUser ? false : this._activeUser.roles.contains(UserRoleEnum.Organizer);
  }

  /**
   * Decides whether active user has trainee role
   * @returns {boolean} true if active user has trainee role, false otherwise
   */
  isTrainee(): boolean {
    return !this._activeUser ? false : this._activeUser.roles.contains(UserRoleEnum.Trainee);
  }

  isAdmin(): boolean {
    return !this._activeUser ? false : this._activeUser.roles.contains(UserRoleEnum.Admin);
  }

  isTraineeOnly(): boolean {
    return !this._activeUser
      ? false
      : this._activeUser.roles.size() == 1 && this.isTrainee()
  }

  getRolesCount(): number {
    if (this._activeUser) {
      return this._activeUser.roles.size();
    }
    return 0;
  }

  login() {
    this.oAuthService.loadDiscoveryDocumentAndLogin()
      .then(() => {
        this.setActiveUser(new User());
        this.loadUserInfo();
      });
  }

  logout() {
    this.setActiveUser(undefined);
    localStorage.clear();
    this.oAuthService.logOut(true);
    this.router.navigate(['/home']);
  }

  /**
   * Decides whether active user is authenticated
   * @returns {boolean} true if active user is authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    return this.oAuthService.hasValidAccessToken() && this.getActiveUser() !== null && this.getActiveUser() !== undefined;
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
    return this.oAuthService.authorizationHeader();
  }

  loadUserInfo(): Observable<User> {
    return this.userFacade.getUserInfo()
      .pipe(map(user =>{
        this.setActiveUser(user);
        return user;
      }))
  }
  /**
   * Sets active user
   * @param {User} user user to be set as active
   */
  setActiveUser(user: User) {
    this._activeUser = user;
    this._onActiveUserChangedSubject.next(user);
  }
}
