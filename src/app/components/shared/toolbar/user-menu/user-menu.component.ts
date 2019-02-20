import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveUserService} from "../../../../services/active-user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'toolbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
/**
 * Component of user menu. Used to access pages of user profile, homepage, etc.
 */
export class UserMenuComponent implements OnInit, OnDestroy {

  activeUserSubscription: Subscription;
  isUserLoggedIn;

  constructor(private activeUserService: ActiveUserService,
              private router: Router) {
    this.subscribeToActiveUserChanges();
  }

  ngOnInit() {
    this.isUserLoggedIn = this.activeUserService.isAuthenticated();
  }

  ngOnDestroy() {
    if (this.activeUserSubscription) {
      this.activeUserSubscription.unsubscribe();
    }
  }

  login() {
    this.activeUserService.login();
  }

  logout() {
    this.activeUserService.logout();
  }

  private subscribeToActiveUserChanges() {
    this.activeUserSubscription = this.activeUserService.onActiveUserChanged
      .subscribe(user => {
        this.isUserLoggedIn = user !== null && user !== undefined;
      })
  }
}
