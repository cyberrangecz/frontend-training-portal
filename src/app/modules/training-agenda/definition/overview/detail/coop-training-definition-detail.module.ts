import { NgModule } from '@angular/core';
import {
    CommonTrainingDefinitionResolver,
    CommonTrainingDefinitionTitleResolver,
    CoopTrainingDefinitionResolver,
    CoopTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopDefinitionDetailRoutingModule } from './coop-definition-detail-routing.module';
import { CoopDefinitionDetailComponentsModule } from '@crczp/training-agenda/definition-detail';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CoopDefinitionDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        CoopDefinitionDetailRoutingModule,
    ],
    providers: [
        { provide: CommonTrainingDefinitionResolver, useClass: CoopTrainingDefinitionResolver },
        { provide: CommonTrainingDefinitionTitleResolver, useClass: CoopTrainingDefinitionTitleResolver },
    ],
})
export class CoopTrainingDefinitionDetailModule {}
