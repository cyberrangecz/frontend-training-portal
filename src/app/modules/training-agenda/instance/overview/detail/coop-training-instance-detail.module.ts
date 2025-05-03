import { NgModule } from '@angular/core';
import { CoopTrainingDefaultNavigator, CoopTrainingNavigator, TrainingNavigator } from '@crczp/training-agenda';
import {
    CoopTrainingInstanceResolver,
    CoopTrainingInstanceTitleResolver,
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { CoopTrainingInstanceDetailRoutingModule } from './coop-training-instance-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { CoopTrainingInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';

@NgModule({
    imports: [
        CoopTrainingInstanceDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        CoopTrainingInstanceDetailRoutingModule,
    ],
    providers: [
        { provide: CoopTrainingNavigator, useClass: CoopTrainingDefaultNavigator },
        { provide: TrainingNavigator, useExisting: CoopTrainingNavigator },
        { provide: TrainingInstanceResolver, useClass: CoopTrainingInstanceResolver },
        { provide: TrainingInstanceTitleResolver, useClass: CoopTrainingInstanceTitleResolver },
        TrainingInstanceBreadcrumbResolver,
    ],
})
export class CoopTrainingInstanceDetailModule {}
