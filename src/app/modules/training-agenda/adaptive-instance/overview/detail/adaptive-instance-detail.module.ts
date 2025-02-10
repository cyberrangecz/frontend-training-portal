import { NgModule } from '@angular/core';
import { AdaptiveInstanceDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-detail';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { AdaptiveInstanceDetailRoutingModule } from './adaptive-instance-detail-routing.module';

@NgModule({
  imports: [
    AdaptiveInstanceDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceDetailRoutingModule,
  ],
})
export class AdaptiveInstanceDetailModule {}
