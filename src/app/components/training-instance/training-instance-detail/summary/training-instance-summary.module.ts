import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../../../../pipes/pipes.module';
import {SandboxInstanceFacadeModule} from '../../../../services/facades/modules/sandbox-instance-facade.module';
import {TrainingRunFacadeModule} from '../../../../services/facades/modules/training-run-facade.module';
import { ActiveTrainingRunOverviewComponent } from './active-training-run-overview/active-training-run-overview.component';
import { ArchivedTrainingRunOverviewComponent } from './archived-training-run-overview/archived-training-run-overview.component';
import { TrainingInstanceInfoComponent } from './training-instance-info/training-instance-info.component';
import {TrainingInstanceSummaryMaterialModule} from './training-instance-summary-material.module';
import {TrainingInstanceSummaryRoutingModule} from './training-instance-summary-routing.module';
import { TrainingInstanceSummaryComponent } from './training-instance-summary.component';
import {Kypo2TableModule} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../services/shared/archived-training-run.service';
import {ArchivedTrainingRunConcreteService} from '../../../../services/training-run/archived-training-run.concrete.service';
import {ActiveTrainingRunService} from '../../../../services/shared/active-training-run.service';
import {ActiveTrainingRunConcreteService} from '../../../../services/training-run/active-training-run-concrete.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TrainingInstanceSummaryMaterialModule,
    TrainingInstanceSummaryRoutingModule,
    TrainingRunFacadeModule,
    SandboxInstanceFacadeModule,
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

export class TrainingInstanceSummaryModule {}
