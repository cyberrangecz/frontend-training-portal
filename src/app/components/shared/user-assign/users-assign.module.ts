import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {Kypo2TableModule} from 'kypo2-table';
import {UserSelectorModule} from '../user-selector/user-selector.module';
import {UserAssignComponent} from './user-assign.component';

@NgModule({
  imports: [
    CommonModule,
    Kypo2TableModule,
    UserSelectorModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    UserAssignComponent
  ],
  exports: [
    UserAssignComponent
  ],
})

export class UsersAssignModule {

}
