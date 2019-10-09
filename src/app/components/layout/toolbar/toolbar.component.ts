import {Component, Input, OnInit} from '@angular/core';
import {User} from 'kypo2-auth';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
/**
 * PRESENTATIONAL COMPONENT
 * Main toolbar of the application containing user menu and breadcrumbs
 */
export class ToolbarComponent extends BaseComponent implements OnInit {

  /**
   * Logged in user
   */
  @Input() user: User;

  ngOnInit() {
  }
}
