import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Kypo2AuthService} from 'kypo2-auth';

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

  constructor(private authService: Kypo2AuthService) {
    this.subscribeToActiveUserChanges();
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }

  ngOnDestroy() {
    if (this.activeUserSubscription) {
      this.activeUserSubscription.unsubscribe();
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  private subscribeToActiveUserChanges() {
    this.activeUserSubscription = this.authService.activeUser$
      .subscribe(user => {
        this.isUserLoggedIn = user !== null && user !== undefined;
      })
  }
}
