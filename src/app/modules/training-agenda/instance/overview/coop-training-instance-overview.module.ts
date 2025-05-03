import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { CoopTrainingInstanceOverviewComponentsModule } from '@crczp/training-agenda/instance-overview';
import { CoopTrainingInstanceOverviewRoutingModule } from './coop-training-instance-overview-routing.module';
import { PortalDynamicEnvironment } from 'environments/portal-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import {
    CoopTrainingInstanceResolver,
    CoopTrainingInstanceTitleResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopTrainingDefaultNavigator, LinearTrainingNavigator } from '@crczp/training-agenda';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        CoopTrainingInstanceOverviewRoutingModule,
        CoopTrainingInstanceOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
    ],
    providers: [
        CoopTrainingInstanceResolver,
        CoopTrainingInstanceTitleResolver,
        { provide: LinearTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingInstanceResolver, useExisting: CoopTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useClass: CoopTrainingInstanceTitleResolver },
    ],
})
export class CoopTrainingInstanceOverviewModule {}
