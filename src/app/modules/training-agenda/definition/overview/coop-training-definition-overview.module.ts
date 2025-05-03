import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingApiModule } from '@crczp/training-api';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { CoopTrainingDefinitionOverviewComponentsModule } from '@crczp/training-agenda/definition-overview';
import { CoopTrainingDefinitionOverviewRoutingModule } from './coop-training-definition-overview-routing.module';
import { CoopTrainingDefinitionResolver, CoopTrainingDefinitionTitleResolver } from '@crczp/training-agenda/resolvers';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        CoopTrainingDefinitionOverviewRoutingModule,
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        CoopTrainingDefinitionOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
    ],
    providers: [CoopTrainingDefinitionResolver, CoopTrainingDefinitionTitleResolver],
})
export class CoopTrainingDefinitionOverviewModule {}
