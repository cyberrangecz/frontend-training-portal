import { Component, OnInit } from '@angular/core';
import {ActiveUserService} from "../../../../services/active-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'toolbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
/**
 * Component of user menu. Used to access pages of user profile, homepage, etc.
 */
export class UserMenuComponent implements OnInit {

  constructor(private activeUserService: ActiveUserService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.activeUserService.logout();
    this.router.navigate(['/login']);
  }
}
