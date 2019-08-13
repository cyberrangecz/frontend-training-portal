import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAndGroupManagementModule} from 'kypo2-user-and-group-management'
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {environment} from '../../../environments/environment';
import {SharedModule} from "../shared/shared.module";
import {AdminMaterialModule} from "./admin-material.module";

@NgModule({
  declarations: [
    AdminOverviewComponent
  ],
  imports: [
    CommonModule,
    UserAndGroupManagementModule.forRoot(environment.kypo2UserAndGroupConfig),
    SharedModule,
    AdminRoutingModule,
    AdminMaterialModule,
  ],
})
export class AdminModule {

}
