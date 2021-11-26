import { NgModule } from '@angular/core';
import { TrainingDefinitionDetailComponentsModule } from '@muni-kypo-crp/training-agenda/definition-detail';
import { TrainingDefinitionDetailRoutingModule } from './training-definition-detail-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    TrainingDefinitionDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionDetailRoutingModule,
  ],
})
export class TrainingDefinitionDetailModule {}
