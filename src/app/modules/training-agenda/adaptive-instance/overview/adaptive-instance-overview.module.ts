import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingApiModule } from '@cyberrangecz-platform/training-api';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';
import { AdaptiveInstanceOverviewRoutingModule } from './adaptive-instance-overview-routing.module';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';
import { AdaptiveInstanceOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-overview';

@NgModule({
  imports: [
    CommonModule,
    TrainingAgendaSharedProvidersModule,
    TrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    AdaptiveInstanceOverviewRoutingModule,
    AdaptiveInstanceOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceOverviewModule {}
