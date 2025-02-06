import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceRunsComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-runs';
import { TrainingInstanceRunsRoutingModule } from './training-instance-runs-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceRunsComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceRunsRoutingModule,
  ],
})
export class TrainingInstanceRunsModule {}
