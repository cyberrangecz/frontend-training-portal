import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionEditRoutingModule } from './cheating-detection-create-routing.module';
import { DynamicEnvironment } from '../../../../../../../../environments/dynamic-environment';
import { TrainingInstanceCheatingDetectionEditComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-cheating-detection-edit';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceCheatingDetectionEditComponentsModule.forRoot(
      DynamicEnvironment.getConfig().trainingAgendaConfig,
    ),
    CheatingDetectionEditRoutingModule,
  ],
})
export class CheatingDetectionCreateOverviewModule {}
