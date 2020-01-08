import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TrainingRunOverviewMaterialModule} from './training-run-overview-material.module';
import { AccessTrainingRunComponent } from './access-training-run/access-training-run.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {TrainingInstanceApiModule} from '../../../services/api/modules/training-instance-api.module';
import {TrainingRunApiModule} from '../../../services/api/modules/training-run-api.module';
import {TrainingDefinitionApiModule} from '../../../services/api/modules/training-definition-api.module';
import {TrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {MatCardModule} from '@angular/material/card';
import {Kypo2TableModule} from 'kypo2-table';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';
import {AccessedTrainingRunConcreteService} from '../../../services/training-run/accessed/accessed-training-run-concrete.service';

/**
 * Main module for trainee agenda. Contains components and top level routing
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainingRunOverviewRoutingModule,
    TrainingRunOverviewMaterialModule,
    PipesModule,
    TrainingInstanceApiModule,
    TrainingRunApiModule,
    TrainingDefinitionApiModule,
    ReactiveFormsModule,
    MatCardModule,
    Kypo2TableModule
  ],
  declarations: [
    TrainingRunOverviewComponent,
    AccessTrainingRunComponent
  ],
  providers: [
    {provide: AccessedTrainingRunService, useClass: AccessedTrainingRunConcreteService},
    RunningTrainingRunService,
    TrainingRunResolver
  ]
})

export class TrainingRunOverviewModule {

}
