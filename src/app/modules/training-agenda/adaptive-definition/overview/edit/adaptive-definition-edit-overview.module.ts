import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionEditOverviewComponentsModule } from '@crczp/training-agenda/adaptive-definition-edit';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { AdaptiveDefinitionEditOverviewRoutingModule } from './adaptive-definition-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveDefinitionEditOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        AdaptiveDefinitionEditOverviewRoutingModule,
    ],
})
export class AdaptiveDefinitionEditOverviewModule {}
