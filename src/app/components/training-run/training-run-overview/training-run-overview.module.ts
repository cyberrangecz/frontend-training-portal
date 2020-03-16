import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TrainingRunOverviewMaterialModule} from './training-run-overview-material.module';
import {AccessTrainingRunComponent} from './access-training-run/access-training-run.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KypoPipesModule} from 'kypo-common';
import {RunningTrainingRunConcreteService} from '../../../services/training-run/running/running-training-run-concrete.service';
import {AccessTrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {MatCardModule} from '@angular/material/card';
import {Kypo2TableModule} from 'kypo2-table';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';
import {AccessedTrainingRunConcreteService} from '../../../services/training-run/accessed/accessed-training-run-concrete.service';
import {TrainingDefinitionApi} from '../../../services/api/training-definition-api.service';
import {TrainingInstanceApi} from '../../../services/api/training-instance-api.service';
import {TrainingRunApi} from '../../../services/api/training-run-api.service';
import {TrainingRunResultsResolver} from '../../../services/resolvers/training-run-results-resolver.service';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';

/**
 * Main module for trainee agenda. Contains components and top level routing
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainingRunOverviewRoutingModule,
    TrainingRunOverviewMaterialModule,
    KypoPipesModule,
    ReactiveFormsModule,
    MatCardModule,
    Kypo2TableModule
  ],
  declarations: [
    TrainingRunOverviewComponent,
    AccessTrainingRunComponent
  ],
  providers: [
    TrainingRunApi,
    TrainingInstanceApi,
    TrainingDefinitionApi,
    AccessTrainingRunResolver,
    TrainingRunResultsResolver,
    {provide: RunningTrainingRunService, useClass: RunningTrainingRunConcreteService},
    {provide: AccessedTrainingRunService, useClass: AccessedTrainingRunConcreteService},
  ]
})

export class TrainingRunOverviewModule {

}
