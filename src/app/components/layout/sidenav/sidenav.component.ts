import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {HOME_PATH} from '../../../paths';
import {User} from 'kypo2-auth';

@Component({
  selector: 'kypo2-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
/**
 * PRESENTATIONAL COMPONENT
 * Component of sidebar navigation. Changes dynamically based on roles of a user
 */
export class SidenavComponent extends BaseComponent  implements OnInit {

  /**
   * Logged in user
   */
  @Input() user: User;

  HOME_PATH = HOME_PATH;

  ngOnInit() {
  }
}
