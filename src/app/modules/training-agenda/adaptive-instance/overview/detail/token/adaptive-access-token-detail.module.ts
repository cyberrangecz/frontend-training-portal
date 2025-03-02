import { NgModule } from '@angular/core';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { CommonModule } from '@angular/common';
import { AdaptiveAccessTokenDetailRoutingModule } from './adaptive-access-token-detail-routing.module';
import { AccessTokenDetailComponentsModule } from '@crczp/training-agenda/instance-access-token';

@NgModule({
    imports: [
        CommonModule,
        AccessTokenDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveAccessTokenDetailRoutingModule,
    ],
})
export class AdaptiveAccessTokenDetailModule {}
