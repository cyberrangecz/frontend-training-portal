import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { CheatingDetectionOverviewRoutingModule } from './training-instance-cheating-detection-routing.module';
import { CheatingDetectionOverviewComponentsModule } from '../../../../../../../../kypo-training-agenda/instance-cheating-detection/src/components/cheating-detection-overview-components.module';

@NgModule({
  imports: [
    CommonModule,
    CheatingDetectionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    CheatingDetectionOverviewRoutingModule,
  ],
})
export class CheatingDetectionOverviewModule {}
