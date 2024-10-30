import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionEditRoutingModule } from './cheating-detection-create-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceCheatingDetectionEditComponentsModule } from '@muni-kypo-crp/training-agenda/instance-cheating-detection-edit';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceCheatingDetectionEditComponentsModule.forRoot(
      KypoDynamicEnvironment.getConfig().trainingAgendaConfig,
    ),
    CheatingDetectionEditRoutingModule,
  ],
})
export class CheatingDetectionCreateOverviewModule {}
