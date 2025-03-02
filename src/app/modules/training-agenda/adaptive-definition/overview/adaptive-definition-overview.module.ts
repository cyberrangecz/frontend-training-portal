import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { AdaptiveDefinitionOverviewRoutingModule } from './adaptive-definition-overview-routing.module';
import { TrainingApiModule } from '@crczp/training-api';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { AdaptiveDefinitionOverviewComponentsModule } from '@crczp/training-agenda/adaptive-definition-overview';
import { SandboxApiModule } from '@crczp/sandbox-api';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        AdaptiveDefinitionOverviewRoutingModule,
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        AdaptiveDefinitionOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
    ],
})
export class AdaptiveDefinitionOverviewModule {}
