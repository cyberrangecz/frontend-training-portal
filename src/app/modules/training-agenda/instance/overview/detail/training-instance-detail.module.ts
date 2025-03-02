import { NgModule } from '@angular/core';
import { TrainingInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceDetailRoutingModule } from './training-instance-detail-routing.module';

@NgModule({
    imports: [
        TrainingInstanceDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingInstanceDetailRoutingModule,
    ],
})
export class TrainingInstanceDetailModule {}
