import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserMapper} from '../../mappers/user.mapper.service';
import {UserApi} from '../user-api.service';

/**
 * Module grouping providers necessary for using user api service
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserApi,
    UserMapper
  ]
})
export class UserApiModule {

}
