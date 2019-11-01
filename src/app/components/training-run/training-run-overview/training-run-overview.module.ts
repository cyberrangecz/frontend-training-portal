import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TrainingRunOverviewMaterialModule} from './training-run-overview-material.module';
import { AccessTrainingRunComponent } from './access-training-run/access-training-run.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {MatCardModule} from '@angular/material/card';
import {Kypo2TableModule} from 'kypo2-table';
import {TrainingRunOverviewService} from '../../../services/shared/training-run-overview.service';
import {TrainingRunOverviewConcreteService} from '../../../services/training-run/training-run-overview.concrete.service';

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
    TrainingInstanceFacadeModule,
    TrainingRunFacadeModule,
    TrainingDefinitionFacadeModule,
    ReactiveFormsModule,
    MatCardModule,
    Kypo2TableModule
  ],
  declarations: [
    TrainingRunOverviewComponent,
    AccessTrainingRunComponent
  ],
  providers: [
    {provide: TrainingRunOverviewService, useClass: TrainingRunOverviewConcreteService},
    ActiveTrainingRunService,
    TrainingRunResolver
  ]
})

export class TrainingRunOverviewModule {

}
