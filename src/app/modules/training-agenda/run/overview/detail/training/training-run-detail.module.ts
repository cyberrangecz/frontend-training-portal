import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunDetailGameModule } from '@muni-kypo-crp/training-agenda/run-detail';
import { TrainingRunDetailRoutingModule } from './training-run-detail-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunDetailRoutingModule,
  ],
})
export class TrainingRunDetailModule {}
