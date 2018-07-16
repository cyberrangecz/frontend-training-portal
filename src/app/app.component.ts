import { Component } from '@angular/core';
import {UserLoaderService} from "./services/data-loaders/user-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kypo Trainings';

  constructor(private userLoaderService: UserLoaderService) {
    this.userLoaderService.loadActiveUser();
  }

}
