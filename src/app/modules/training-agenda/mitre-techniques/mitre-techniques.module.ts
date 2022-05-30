import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@muni-kypo-crp/training-agenda/mitre-techniques';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
import { TrainingAgendaSharedProvidersModule } from '../training-agenda-shared-providers.module';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    MitreTechniquesComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    MitreTechniquesRoutingModule,
  ],
})
export class MitreTechniquesModule {}
