import { NgModule } from '@angular/core';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { CommonModule } from '@angular/common';
import { AdaptiveAccessTokenDetailRoutingModule } from './adaptive-access-token-detail-routing.module';
import { AccessTokenDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-access-token';

@NgModule({
  imports: [
    CommonModule,
    AccessTokenDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveAccessTokenDetailRoutingModule,
  ],
})
export class AdaptiveAccessTokenDetailModule {}
