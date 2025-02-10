import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/run-overview';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingRunOverviewRoutingModule } from './training-run-overview-routing.module';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    TrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingRunOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunOverviewRoutingModule,
  ],
})
export class TrainingRunOverviewModule {}
