import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingApiModule } from '@crczp/training-api';
import { LinearTrainingDefinitionOverviewComponentsModule } from '@crczp/training-agenda/definition-overview';
import { LinearTrainingDefinitionOverviewRoutingModule } from './linear-training-definition-overview-routing.module';
import { SandboxApiModule } from '@crczp/sandbox-api';
import {
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        LinearTrainingDefinitionOverviewRoutingModule,
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        LinearTrainingDefinitionOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
    ],
    providers: [LinearTrainingDefinitionResolver, LinearTrainingDefinitionTitleResolver],
})
export class LinearTrainingDefinitionOverviewModule {}
