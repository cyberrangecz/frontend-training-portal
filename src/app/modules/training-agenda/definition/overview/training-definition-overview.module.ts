import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/definition-overview';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingDefinitionOverviewModule {}
