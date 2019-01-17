import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TraineeOverviewRoutingModule} from "./trainee-overview-routing.module";
import {TraineeOverviewComponent} from "./trainee-overview.component";
import {TraineeOverviewMaterialModule} from "./trainee-overview-material.module";
import { TraineeAccessTrainingComponent } from './trainee-access-training/trainee-access-training.component';
import { TraineeTrainingsTableComponent } from './trainee-trainings-table/trainee-trainings-table.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {TrainingInstanceFacade} from "../../../services/facades/training-instance-facade.service";
import {TrainingRunFacade} from "../../../services/facades/training-run-facade.service";
import {TrainingRunGuard} from "../../../guards/training-run-guard.service";
import {TrainingInstanceMapper} from "../../../services/mappers/training-instance-mapper.service";
import {TrainingRunMapper} from "../../../services/mappers/training-run-mapper.service";
import {LevelMapper} from "../../../services/mappers/level-mapper.service";
import {TrainingDefinitionMapper} from "../../../services/mappers/training-definition-mapper.service";
import {TrainingDefinitionFacade} from "../../../services/facades/training-definition-facade.service";
import {PipesModule} from "../../../pipes/pipes.module";
import {ActiveTrainingRunLevelsService} from "../../../services/active-training-run-levels.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TraineeOverviewRoutingModule,
    TraineeOverviewMaterialModule,
    PipesModule
  ],
  declarations: [
    TraineeOverviewComponent,
    TraineeAccessTrainingComponent,
    TraineeTrainingsTableComponent
  ],
  providers: [
    TrainingDefinitionFacade,
    TrainingDefinitionMapper,
    TrainingInstanceFacade,
    TrainingInstanceMapper,
    TrainingRunFacade,
    TrainingRunMapper,
    TrainingRunGuard,
    LevelMapper,
    ActiveTrainingRunLevelsService,
  ]
})

export class TraineeOverviewModule {

}
