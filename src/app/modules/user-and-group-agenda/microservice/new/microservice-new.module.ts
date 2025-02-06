import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MicroserviceEditComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/microservice-registration';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { MicroserviceNewRoutingModule } from './microservice-new-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAndGroupSharedProvidersModule,
    MicroserviceNewRoutingModule,
    MicroserviceEditComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().userAndGroupAgendaConfig),
  ],
})
export class MicroserviceNewModule {}
