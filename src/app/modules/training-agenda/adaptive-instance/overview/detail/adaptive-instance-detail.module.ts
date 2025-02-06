import { NgModule } from '@angular/core';
import { AdaptiveInstanceDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-detail';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveInstanceDetailRoutingModule } from './adaptive-instance-detail-routing.module';

@NgModule({
  imports: [
    AdaptiveInstanceDetailComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceDetailRoutingModule,
  ],
})
export class AdaptiveInstanceDetailModule {}
