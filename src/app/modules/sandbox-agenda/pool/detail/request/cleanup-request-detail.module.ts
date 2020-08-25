import { NgModule } from '@angular/core';
import { CleanupRequestDetailComponentsModule } from 'kypo-sandbox-agenda/request-detail';
import { AllocationRequestDetailRoutingModule } from './allocation-request-detail-routing.module';

@NgModule({
  imports: [CleanupRequestDetailComponentsModule, AllocationRequestDetailRoutingModule],
})
export class CleanupRequestDetailModule {}
