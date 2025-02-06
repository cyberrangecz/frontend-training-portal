import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionOverviewRoutingModule } from './training-instance-cheating-detection-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { CheatingDetectionOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-cheating-detection';

@NgModule({
  imports: [
    CommonModule,
    CheatingDetectionOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    CheatingDetectionOverviewRoutingModule,
  ],
})
export class CheatingDetectionOverviewModule {}
