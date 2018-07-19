import { Component } from '@angular/core';
import {UserGetterService} from "./services/data-getters/user-getter.service";

/**
 * Main component serving as wrapper for sidenav, toolbar and inner routed views
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isSidenavOpen: boolean = false;

  constructor(private userLoaderService: UserGetterService) {
    this.userLoaderService.loadActiveUser();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
