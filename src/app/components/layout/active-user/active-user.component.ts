import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {LOGIN_PATH} from '../../../paths';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
/** PRESENTATIONAL with global services
 * Logged in user info component
 */
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

  login() {
    this.router.navigate([LOGIN_PATH]);
  }

  logout() {
    this.authService.logout();
  }
}
