import { NgModule } from '@angular/core';
import { LinearDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { LinearDefinitionDetailRoutingModule } from './linear-definition-detail-routing.module';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        LinearDefinitionDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        LinearDefinitionDetailRoutingModule,
    ],
    providers: [
        { provide: CommonTrainingDefinitionResolver, useClass: LinearTrainingDefinitionResolver },
        { provide: CommonTrainingDefinitionTitleResolver, useClass: LinearTrainingDefinitionTitleResolver },
    ],
})
export class LinearTrainingDefinitionDetailModule {}
