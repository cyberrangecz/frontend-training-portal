import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { AccessTokenDetailComponent } from './access-token-detail.component';
import {RouterModule} from "@angular/router";
import {TrainingInstanceFacadeModule} from "../../../services/facades/modules/training-instance-facade.module";
import {MatProgressSpinnerModule} from "@angular/material";
import {AccessTokenDetailRoutingModule} from './access-token-detail-routing.module';
import {TrainingInstanceGuardService} from '../../../services/guards/training-instance-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccessTokenDetailRoutingModule,
    TrainingInstanceFacadeModule,
    MatProgressSpinnerModule
  ],
  declarations: [
  AccessTokenDetailComponent
  ],
  providers: [
    TrainingInstanceGuardService
  ]
})

export class AccessTokenDetailModule {

}
