import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { TrainingRunDetailGameModule } from 'kypo-training-agenda/run-detail';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { TrainingRunDetailRoutingModule } from './training-run-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingRunDetailRoutingModule,
  ],
})
export class TrainingRunDetailModule {}
