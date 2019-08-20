import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrainingInstanceSummaryComponent } from './training-instance-summary.component';
import {TrainingInstanceSummaryMaterialModule} from './training-instance-summary-material.module';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import { TrainingInstanceInfoComponent } from './training-instance-info/training-instance-info.component';
import { ActiveTrainingRunOverviewComponent } from './active-training-run-overview/active-training-run-overview.component';
import {PipesModule} from '../../../../pipes/pipes.module';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {TrainingRunFacadeModule} from '../../../../services/facades/modules/training-run-facade.module';
import { ArchivedTrainingRunOverviewComponent } from './archived-training-run-overview/archived-training-run-overview.component';
import {SandboxInstanceFacadeModule} from '../../../../services/facades/modules/sandbox-instance-facade.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TrainingInstanceSummaryMaterialModule,
    TrainingInstanceSummaryRoutingModule,
    TrainingRunFacadeModule,
    SandboxInstanceFacadeModule
  ],
  declarations: [
  TrainingInstanceSummaryComponent,
  TrainingInstanceInfoComponent,
  ActiveTrainingRunOverviewComponent,
  ArchivedTrainingRunOverviewComponent
  ],
  providers: [
    ErrorHandlerService
  ]
})

export class TrainingInstanceSummaryModule {}
