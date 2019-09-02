import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { UserIdComponent } from './user-id/user-id.component';

/**
 * Module wrapping shared user id component
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UserIdComponent,
  ],
  exports: [
    UserIdComponent,
  ]
})

export class UserIdModule {

}
