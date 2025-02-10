import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-overview';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    AdaptiveDefinitionOverviewRoutingModule,
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    AdaptiveDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveDefinitionOverviewModule {}
