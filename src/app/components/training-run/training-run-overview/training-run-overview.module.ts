import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import { AccessTrainingRunComponent } from './access-training-run/access-training-run.component';
import {TrainingRunOverviewMaterialModule} from './training-run-overview-material.module';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import { TrainingRunTableComponent } from './training-run-table/training-run-table.component';

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
    MatCardModule
  ],
  declarations: [
    TrainingRunOverviewComponent,
    AccessTrainingRunComponent,
    TrainingRunTableComponent
  ],
  providers: [
    ActiveTrainingRunService,
    TrainingRunResolver
  ]
})

export class TrainingRunOverviewModule {

}
