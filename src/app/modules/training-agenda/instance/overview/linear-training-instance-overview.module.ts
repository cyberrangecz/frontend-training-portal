import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { TrainingApiModule } from '@crczp/training-api';
import { LinearTrainingInstanceOverviewRoutingModule } from './linear-training-instance-overview-routing.module';
import { LinearTrainingInstanceOverviewComponentsModule } from '@crczp/training-agenda/instance-overview';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import {
    LinearTrainingInstanceResolver,
    LinearTrainingInstanceTitleResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { LinearTrainingDefaultNavigator, LinearTrainingNavigator } from '@crczp/training-agenda';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        LinearTrainingInstanceOverviewRoutingModule,
        LinearTrainingInstanceOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
    ],
    providers: [
        LinearTrainingInstanceResolver,
        LinearTrainingInstanceTitleResolver,
        { provide: LinearTrainingNavigator, useClass: LinearTrainingDefaultNavigator },
        { provide: TrainingInstanceResolver, useExisting: LinearTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useExisting: LinearTrainingInstanceTitleResolver },
    ],
})
export class LinearTrainingInstanceOverviewModule {}
