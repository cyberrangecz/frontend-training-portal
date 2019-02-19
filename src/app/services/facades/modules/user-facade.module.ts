import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UserFacade} from "../user-facade.service";
import {UserMapper} from "../../mappers/user.mapper.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserFacade,
    UserMapper
  ]
})
export class UserFacadeModule {

}
