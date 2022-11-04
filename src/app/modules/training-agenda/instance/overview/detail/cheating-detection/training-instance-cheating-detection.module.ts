import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionOverviewRoutingModule } from './training-instance-cheating-detection-routing.module';
import { CheatingDetectionOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/instance-cheating-detection';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    CheatingDetectionOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    CheatingDetectionOverviewRoutingModule,
  ],
})
export class CheatingDetectionOverviewModule {}
