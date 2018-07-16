import { Component } from '@angular/core';
import {UserLoaderService} from "./services/data-loaders/user-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isSidenavOpen: boolean = false;

  constructor(private userLoaderService: UserLoaderService) {
    this.userLoaderService.loadActiveUser();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
