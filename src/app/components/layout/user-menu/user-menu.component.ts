import {Component, Input, OnInit} from '@angular/core';
import {User} from 'kypo2-auth';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent extends BaseComponent implements OnInit {

  @Input() user: User;

  ngOnInit() {
  }

}
