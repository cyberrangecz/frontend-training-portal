import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {MatButtonModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [

  ]
})

export class LoginModule {

}
