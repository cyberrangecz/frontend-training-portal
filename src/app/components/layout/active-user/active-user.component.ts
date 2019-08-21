import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BaseComponent} from '../../base.component';
import {Router} from '@angular/router';
import {LOGIN_PATH} from '../../../paths';

@Component({
  selector: 'kypo2-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.css']
})
/**
 * Component of user menu. Used to access pages of user profile, homepage, etc.
 */
export class ActiveUserComponent extends BaseComponent implements OnInit {

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
