import { NgModule } from '@angular/core';
import { UserDetailComponentsModule } from '@cyberrangecz-platform/user-and-group-agenda/user-detail';
import { GroupDetailRoutingModule } from './user-detail-routing.module';
import { UserAndGroupSharedProvidersModule } from '../../user-and-group-shared-providers.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, UserAndGroupSharedProvidersModule, GroupDetailRoutingModule, UserDetailComponentsModule],
})
export class UserDetailModule {}
