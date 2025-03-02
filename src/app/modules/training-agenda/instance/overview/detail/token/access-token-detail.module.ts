import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessTokenDetailComponentsModule } from '@crczp/training-agenda/instance-access-token';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { AccessTokenDetailRoutingModule } from './access-token-detail-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AccessTokenDetailComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AccessTokenDetailRoutingModule,
    ],
})
export class AccessTokenDetailModule {}
