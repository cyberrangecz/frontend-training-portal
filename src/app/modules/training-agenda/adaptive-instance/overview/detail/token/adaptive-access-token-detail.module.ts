import { NgModule } from '@angular/core';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { CommonModule } from '@angular/common';
import { AdaptiveAccessTokenDetailRoutingModule } from './adaptive-access-token-detail-routing.module';
import { AccessTokenDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-access-token';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveAccessTokenDetailRoutingModule,
  ],
})
export class AdaptiveAccessTokenDetailModule {}
