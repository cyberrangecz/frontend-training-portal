import { NgModule } from '@angular/core';
import { TrainingDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { TrainingDefinitionDetailRoutingModule } from './training-definition-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        TrainingDefinitionDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingDefinitionDetailRoutingModule,
    ],
})
export class TrainingDefinitionDetailModule {}
