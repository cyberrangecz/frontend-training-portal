import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAndGroupManagementModule} from 'kypo2-user-and-group-management'
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import {UserAndGroupConfig} from "../../model/config/user-and-group-config";
import {AdminRoutingModule} from "./admin-routing.module";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [
    AdminOverviewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserAndGroupManagementModule.forRoot(UserAndGroupConfig)
  ]
})
export class AdminModule {

}
