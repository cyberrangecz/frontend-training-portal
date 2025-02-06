import { NgModule } from '@angular/core';
import { TrainingInstanceDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-detail';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceDetailRoutingModule } from './training-instance-detail-routing.module';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule,
  ],
})
export class TrainingInstanceDetailModule {}
