import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionEditOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-edit';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveDefinitionEditOverviewRoutingModule } from './adaptive-definition-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionEditOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionEditOverviewRoutingModule,
  ],
})
export class AdaptiveDefinitionEditOverviewModule {}
