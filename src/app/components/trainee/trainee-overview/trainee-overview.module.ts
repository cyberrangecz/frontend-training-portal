import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TraineeOverviewRoutingModule} from "./trainee-overview-routing.module";
import {TraineeOverviewComponent} from "./trainee-overview.component";
import {TraineeOverviewMaterialModule} from "./trainee-overview-material.module";
import { TraineeAccessTrainingComponent } from './trainee-access-training/trainee-access-training.component';
import { TraineeTrainingsTableComponent } from './trainee-trainings-table/trainee-trainings-table.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {PipesModule} from "../../../pipes/pipes.module";
import {ActiveTrainingRunService} from "../../../services/trainee/active-training-run.service";
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TraineeOverviewRoutingModule,
    TraineeOverviewMaterialModule,
    PipesModule,
    TrainingInstanceFacadeModule,
    TrainingRunFacadeModule,
    TrainingDefinitionFacadeModule
  ],
  declarations: [
    TraineeOverviewComponent,
    TraineeAccessTrainingComponent,
    TraineeTrainingsTableComponent
  ],
  providers: [
    ActiveTrainingRunService,
  ]
})

export class TraineeOverviewModule {

}
