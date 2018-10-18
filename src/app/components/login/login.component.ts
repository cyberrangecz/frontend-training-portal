import { Component, OnInit } from '@angular/core';
import {ActiveUserService} from "../../services/active-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activeUserService: ActiveUserService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.activeUserService.login();
    this.router.navigate(['/home']);
  }
}
