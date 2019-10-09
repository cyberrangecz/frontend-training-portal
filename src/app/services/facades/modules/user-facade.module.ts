import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserMapper} from '../../mappers/user.mapper.service';
import {UserFacade} from '../user-facade.service';

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
