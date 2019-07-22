import {Component, OnInit} from '@angular/core';
import {Kypo2AuthService} from 'kypo2-auth';
import {BaseComponent} from "../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'toolbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
/**
 * Component of user menu. Used to access pages of user profile, homepage, etc.
 */
export class UserMenuComponent extends BaseComponent implements OnInit {

  isUserLoggedIn;

  constructor(private authService: Kypo2AuthService) {
    super();
    this.subscribeToActiveUserChanges();
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }


  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  private subscribeToActiveUserChanges() {
    this.authService.activeUser$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(user => {
        this.isUserLoggedIn = user !== null && user !== undefined;
      })
  }
}
