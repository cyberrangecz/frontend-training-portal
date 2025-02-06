import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessTokenDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-access-token';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { AccessTokenDetailRoutingModule } from './access-token-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AccessTokenDetailRoutingModule,
  ],
})
export class AccessTokenDetailModule {}
