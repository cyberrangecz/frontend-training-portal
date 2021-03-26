import { NgModule } from '@angular/core';
import { AdaptiveAccessTokenDetailComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-access-token';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { CommonModule } from '@angular/common';
import { AdaptiveAccessTokenDetailRoutingModule } from './adaptive-access-token-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveAccessTokenDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveAccessTokenDetailRoutingModule,
  ],
})
export class AdaptiveAccessTokenDetailModule {}
