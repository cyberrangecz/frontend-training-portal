import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingDefinitionOverviewComponentsModule } from '@crczp/training-agenda/definition-overview';
import { TrainingApiModule } from '@crczp/training-api';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';
import { SandboxApiModule } from '@crczp/sandbox-api';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        TrainingDefinitionOverviewRoutingModule,
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        TrainingDefinitionOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
    ],
})
export class TrainingDefinitionOverviewModule {}
