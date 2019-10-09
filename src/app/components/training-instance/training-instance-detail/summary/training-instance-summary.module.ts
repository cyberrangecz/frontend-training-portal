import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../../../../pipes/pipes.module';
import {SandboxInstanceFacadeModule} from '../../../../services/facades/modules/sandbox-instance-facade.module';
import {TrainingRunFacadeModule} from '../../../../services/facades/modules/training-run-facade.module';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import { ActiveTrainingRunOverviewComponent } from './active-training-run-overview/active-training-run-overview.component';
import { ArchivedTrainingRunOverviewComponent } from './archived-training-run-overview/archived-training-run-overview.component';
import { TrainingInstanceInfoComponent } from './training-instance-info/training-instance-info.component';
import {TrainingInstanceSummaryMaterialModule} from './training-instance-summary-material.module';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import { TrainingInstanceSummaryComponent } from './training-instance-summary.component';

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
