import {Component, Input, OnInit} from '@angular/core';
import {User} from 'kypo2-auth';
import {HOME_PATH} from '../../../paths';
import {BaseComponent} from '../../base.component';

/**
 * Component of sidebar navigation. Changes dynamically based on roles of a user
 */
@Component({
  selector: 'kypo2-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends BaseComponent  implements OnInit {

  /**
   * Logged in user
   */
  @Input() user: User;

  HOME_PATH = HOME_PATH;

  ngOnInit() {
  }
}
