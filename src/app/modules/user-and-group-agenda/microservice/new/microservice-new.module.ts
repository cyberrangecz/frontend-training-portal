import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroserviceEditComponentsModule } from '@crczp/user-and-group-agenda/microservice-registration';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { MicroserviceNewRoutingModule } from './microservice-new-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UserAndGroupSharedProvidersModule,
        MicroserviceNewRoutingModule,
        MicroserviceEditComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
    ],
})
export class MicroserviceNewModule {}
