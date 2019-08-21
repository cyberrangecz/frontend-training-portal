import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {User} from 'kypo2-auth';

@Component({
  selector: 'kypo2-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
/**
 * Main toolbar of the application. Shows logo and a user menu component
 */
export class ToolbarComponent extends BaseComponent implements OnInit {

  @Input() user: User;

  ngOnInit() {
  }
}
