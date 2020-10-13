import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { TrainingRunDetailGameModule } from 'kypo-training-agenda/run-detail';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { TrainingRunDetailRoutingModule } from './training-run-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailGameModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingRunDetailRoutingModule,
  ],
})
export class TrainingRunDetailModule {}
