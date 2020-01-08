import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../../../../pipes/pipes.module';
import {SandboxInstanceApiModule} from '../../../../services/api/modules/sandbox-instance-api.module';
import {TrainingRunApiModule} from '../../../../services/api/modules/training-run-api.module';
import { ActiveTrainingRunOverviewComponent } from './active-training-run-overview/active-training-run-overview.component';
import { ArchivedTrainingRunOverviewComponent } from './archived-training-run-overview/archived-training-run-overview.component';
import { TrainingInstanceInfoComponent } from './training-instance-info/training-instance-info.component';
import {TrainingInstanceSummaryMaterialModule} from './training-instance-summary-material.module';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import { TrainingInstanceSummaryComponent } from './training-instance-summary.component';
import {Kypo2TableModule} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../services/training-run/archived/archived-training-run.service';
import {ArchivedTrainingRunConcreteService} from '../../../../services/training-run/archived/archived-training-run-concrete.service';
import {ActiveTrainingRunConcreteService} from '../../../../services/training-run/active/active-training-run-concrete.service';
import {ActiveTrainingRunService} from '../../../../services/training-run/active/active-training-run.service';

/**
 * Components and providers for training instance summaries.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TrainingInstanceSummaryMaterialModule,
    TrainingInstanceSummaryRoutingModule,
    TrainingRunApiModule,
    SandboxInstanceApiModule,
    Kypo2TableModule
  ],
  declarations: [
  TrainingInstanceSummaryComponent,
  TrainingInstanceInfoComponent,
  ActiveTrainingRunOverviewComponent,
  ArchivedTrainingRunOverviewComponent
  ],
  providers: [
    {provide: ArchivedTrainingRunService, useClass: ArchivedTrainingRunConcreteService},
    {provide: ActiveTrainingRunService, useClass: ActiveTrainingRunConcreteService},
  ]
})
export class TrainingInstanceSummaryModule {

}
