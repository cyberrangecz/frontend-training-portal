import { Component } from '@angular/core';
import {UserGetterService} from "./services/data-getters/user-getter.service";

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
