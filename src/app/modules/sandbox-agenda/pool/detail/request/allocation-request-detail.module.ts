import { NgModule } from '@angular/core';
import { AllocationRequestDetailComponentsModule } from 'kypo-sandbox-agenda/request-detail';
import { RequestDetailRoutingModule } from './request-detail-routing.module';

@NgModule({
  imports: [AllocationRequestDetailComponentsModule, RequestDetailRoutingModule],
})
export class AllocationRequestDetailModule {}
