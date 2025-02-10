import { NgModule } from '@angular/core';
import { TrainingDefinitionDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/definition-detail';
import { TrainingDefinitionDetailRoutingModule } from './training-definition-detail-routing.module';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    TrainingDefinitionDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionDetailRoutingModule,
  ],
})
export class TrainingDefinitionDetailModule {}
