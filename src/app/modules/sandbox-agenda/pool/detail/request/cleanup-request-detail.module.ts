import { NgModule } from '@angular/core';
import { CleanupRequestDetailComponentsModule } from 'kypo-sandbox-agenda/request-detail';
import { RequestDetailRoutingModule } from './request-detail-routing.module';

@NgModule({
  imports: [CleanupRequestDetailComponentsModule, RequestDetailRoutingModule],
})
export class CleanupRequestDetailModule {}
