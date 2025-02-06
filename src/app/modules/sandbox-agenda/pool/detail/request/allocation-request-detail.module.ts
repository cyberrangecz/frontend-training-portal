import { NgModule } from '@angular/core';
import { AllocationRequestDetailComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/request-detail';
import { AllocationRequestDetailRoutingModule } from './allocation-request-detail-routing.module';

@NgModule({
  imports: [AllocationRequestDetailComponentsModule, AllocationRequestDetailRoutingModule],
})
export class AllocationRequestDetailModule {}
