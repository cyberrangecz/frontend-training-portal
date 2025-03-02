import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingApiModule } from '@crczp/training-api';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { AdaptiveInstanceOverviewRoutingModule } from './adaptive-instance-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { AdaptiveInstanceOverviewComponentsModule } from '@crczp/training-agenda/adaptive-instance-overview';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        AdaptiveInstanceOverviewRoutingModule,
        AdaptiveInstanceOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
    ],
})
export class AdaptiveInstanceOverviewModule {}
