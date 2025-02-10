import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunDetailGameModule } from '@cyberrangecz-platform/training-agenda/run-detail';
import { TrainingRunDetailRoutingModule } from './training-run-detail-routing.module';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunDetailRoutingModule,
  ],
})
export class TrainingRunDetailModule {}
