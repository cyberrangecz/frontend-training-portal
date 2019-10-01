import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UserSelectorModule} from '../user-selector/user-selector.module';
import {UserAssignComponent} from './user-assign.component';
import {Kypo2TableModule} from 'kypo2-table';
import {MatDividerModule} from '@angular/material/divider';

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
