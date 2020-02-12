import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {AccessTokenDetailRoutingModule} from './access-token-detail-routing.module';
import {AccessTokenDetailComponent} from './access-token-detail.component';
import {TrainingInstanceApi} from '../../../../services/api/training-instance-api.service';

/**
 * Module containing components and providers for the access token page
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccessTokenDetailRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [
  AccessTokenDetailComponent
  ],
  providers: [
    TrainingInstanceApi
  ]
})

export class AccessTokenDetailModule {

}
