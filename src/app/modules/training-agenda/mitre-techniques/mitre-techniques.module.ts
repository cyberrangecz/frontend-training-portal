import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@cyberrangecz-platform/training-agenda/mitre-techniques';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { TrainingAgendaSharedProvidersModule } from '../training-agenda-shared-providers.module';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    MitreTechniquesComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    MitreTechniquesRoutingModule,
  ],
})
export class MitreTechniquesModule {}
