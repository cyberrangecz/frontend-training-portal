import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {TrainingInstanceGuard} from '../../../services/guards/training-instance-guard.service';
import {AccessTokenDetailRoutingModule} from './access-token-detail-routing.module';
import { AccessTokenDetailComponent } from './access-token-detail.component';

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
    TrainingInstanceGuard
  ]
})

export class AccessTokenDetailModule {

}
