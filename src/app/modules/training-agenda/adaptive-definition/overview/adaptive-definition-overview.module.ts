import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { KypoTrainingApiModule } from '@cyberrangecz-platform/training-api';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-overview';
import { KypoSandboxApiModule } from '@cyberrangecz-platform/sandbox-api';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    AdaptiveDefinitionOverviewRoutingModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    AdaptiveDefinitionOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveDefinitionOverviewModule {}
