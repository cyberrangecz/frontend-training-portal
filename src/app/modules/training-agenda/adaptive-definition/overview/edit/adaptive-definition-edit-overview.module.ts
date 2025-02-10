import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionEditOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-edit';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { AdaptiveDefinitionEditOverviewRoutingModule } from './adaptive-definition-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionEditOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionEditOverviewRoutingModule,
  ],
})
export class AdaptiveDefinitionEditOverviewModule {}
