import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { TrainingInstanceCheatingDetectionEditComponentsModule } from '../../../../../../../../../kypo-training-agenda/instance-cheating-detection-edit/src/components/cheating-detection-edit-component.module';
import { CheatingDetectionEditRoutingModule } from './cheating-detection-create-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceCheatingDetectionEditComponentsModule.forRoot(environment.trainingAgendaConfig),
    CheatingDetectionEditRoutingModule,
  ],
})
export class CheatingDetectionCreateOverviewModule {}
