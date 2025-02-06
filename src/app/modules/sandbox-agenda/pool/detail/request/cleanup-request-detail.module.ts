import { NgModule } from '@angular/core';
import { CleanupRequestDetailComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/request-detail';
import { AllocationRequestDetailRoutingModule } from './allocation-request-detail-routing.module';

@NgModule({
  imports: [CleanupRequestDetailComponentsModule, AllocationRequestDetailRoutingModule],
})
export class CleanupRequestDetailModule {}
