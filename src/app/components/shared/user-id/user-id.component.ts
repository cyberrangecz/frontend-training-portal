import { Component, OnInit } from '@angular/core';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {tap} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';

/**
 * Displays icon and basic info about logged in user
 */
@Component({
  selector: 'kypo2-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent extends BaseComponent implements OnInit {

  user: User;
  avatar: string;
  constructor(private authService: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.user = this.authService.getActiveUser();
    this.authService.activeUser$
      .pipe(
        tap(user => {
          if (user) {
            this.avatar = this.user.picture;
          }
        })
      )
      .subscribe(user => this.user = user);
  }
}
