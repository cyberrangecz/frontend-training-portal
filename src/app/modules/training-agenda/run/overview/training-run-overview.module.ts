import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunOverviewComponentsModule } from '@crczp/training-agenda/run-overview';
import { TrainingApiModule } from '@crczp/training-api';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { TrainingAgendaSharedProvidersModule } from '../../training-agenda-shared-providers.module';
import { TrainingRunOverviewRoutingModule } from './training-run-overview-routing.module';
import { SandboxApiModule } from '@crczp/sandbox-api';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        TrainingRunOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingRunOverviewRoutingModule,
    ],
})
export class TrainingRunOverviewModule {}
