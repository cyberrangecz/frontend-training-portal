import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TrainingRunOverviewMaterialModule} from './training-run-overview-material.module';
import { AccessTrainingRunComponent } from './access-training-run/access-training-run.component';
import { TrainingRunTableComponent } from './training-run-table/training-run-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';

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
    ReactiveFormsModule
  ],
  declarations: [
    TrainingRunOverviewComponent,
    AccessTrainingRunComponent,
    TrainingRunTableComponent
  ],
  providers: [
    ActiveTrainingRunService,
  ]
})

export class TrainingRunOverviewModule {

}
