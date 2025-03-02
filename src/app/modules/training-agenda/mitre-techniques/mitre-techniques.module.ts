import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MitreTechniquesComponentsModule } from '@crczp/training-agenda/mitre-techniques';
import { TrainingApiModule } from '@crczp/training-api';
import { TrainingAgendaSharedProvidersModule } from '../training-agenda-shared-providers.module';
import { MitreTechniquesRoutingModule } from './mitre-techniques-routing.module';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        TrainingAgendaSharedProvidersModule,
        MitreTechniquesComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingApiModule.forRoot(PortalDynamicEnvironment.getConfig().trainingApiConfig),
        MitreTechniquesRoutingModule,
    ],
})
export class MitreTechniquesModule {}
