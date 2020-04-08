import {NgModule} from '@angular/core';
import {AccessTokenDetailRoutingModule} from './access-token-detail-routing.module';
import {AccessTokenDetailComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    AccessTokenDetailRoutingModule
  ]
})
export class AccessTokenDetailModule {

}
