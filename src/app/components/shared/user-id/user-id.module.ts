import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { UserIdComponent } from './user-id.component';

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
