import { NgModule } from '@angular/core';
import { LinearTrainingInstanceDetailComponentsModule } from '@crczp/training-agenda/instance-detail';
import { LinearTrainingInstanceDetailRoutingModule } from './linear-training-instance-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        LinearTrainingInstanceDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        LinearTrainingInstanceDetailRoutingModule,
    ],
})
export class LinearTrainingInstanceDetailModule {}
