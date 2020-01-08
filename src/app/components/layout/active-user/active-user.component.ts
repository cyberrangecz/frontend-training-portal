import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {LOGIN_PATH} from '../../../paths';
import {BaseComponent} from '../../base.component';

/**
 *  Logged in user details
 */
@Component({
  selector: 'kypo2-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})

export class ActiveUserComponent extends BaseComponent implements OnInit {

  /**
   * Logged in user
   */
  @Input() user: User;

  constructor(private authService: Kypo2AuthService,
              private router: Router) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Navigates to login page
   */
  login() {
    this.router.navigate([LOGIN_PATH]);
  }

  /**
   * Logs out active user
   */
  logout() {
    this.authService.logout();
  }
}
