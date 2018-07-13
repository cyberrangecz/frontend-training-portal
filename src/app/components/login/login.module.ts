import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [

  ]
})

export class LoginModule {

}
