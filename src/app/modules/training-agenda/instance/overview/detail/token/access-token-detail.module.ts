import {NgModule} from '@angular/core';
import {AccessTokenDetailRoutingModule} from './access-token-detail-routing.module';
import {AccessTokenDetailComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AccessTokenDetailRoutingModule
  ]
})
export class AccessTokenDetailModule {

}
