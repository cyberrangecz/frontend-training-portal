import {Component, Input, OnInit} from '@angular/core';
import {User} from 'kypo2-auth';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
/**
 * Component of user menu. Contains icon and expandable detail of logged user.
 */
export class UserMenuComponent extends BaseComponent implements OnInit {

  /**
   * Logged in user
   */
  @Input() user: User;

  ngOnInit() {
  }

}
