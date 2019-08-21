import { Component, OnInit } from '@angular/core';
import {Kypo2AuthService, User} from 'kypo2-auth';
import * as Identicon  from 'identicon.js';
import { sha256 } from 'js-sha256';
import {BaseComponent} from '../../base.component';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'kypo2-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent extends BaseComponent implements OnInit {

  user: User;
  avatar: string;
  avatarOption = {
    background: [255, 255, 255, 255],
    margin: 0.2,
    size: 75,
  };
  constructor(private authService: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.user = this.authService.getActiveUser();
    this.authService.activeUser$
      .pipe(
        tap(user => {
          if (user) {
            this.avatar = new Identicon(sha256(user.login + user.issuer), this.avatarOption).toString();
          }
        })
      )
      .subscribe(user => this.user = user);
  }
}
