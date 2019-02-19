import { Component, OnInit } from '@angular/core';
import {ActiveUserService} from "../../services/active-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activeUserService: ActiveUserService) { }

  ngOnInit() {
  }

  login() {
    this.activeUserService.login();
  }
}
