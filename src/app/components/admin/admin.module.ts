import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAndGroupModule} from 'kypo2-user-and-group-management'
import {UserAndGroupConfig} from './user-and-group-config';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';

@NgModule({
  declarations: [
    AdminOverviewComponent
  ],
  imports: [
    CommonModule,
    UserAndGroupModule.forRoot(UserAndGroupConfig)
  ]
})
export class AdminModule {

}
