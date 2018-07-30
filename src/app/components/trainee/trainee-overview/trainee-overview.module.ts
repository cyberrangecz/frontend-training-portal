import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TraineeOverviewRoutingModule} from "./trainee-overview-routing.module";
import {TraineeOverviewComponent} from "./trainee-overview.component";
import {TraineeOverviewMaterialModule} from "./trainee-overview-material.module";
import { TraineeAccessTrainingComponent } from './trainee-access-training/trainee-access-training.component';
import { TraineeTrainingsTableComponent } from './trainee-trainings-table/trainee-trainings-table.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {TrainingRunGetterService} from "../../../services/data-getters/training-run-getter.service";
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TraineeOverviewRoutingModule,
    TraineeOverviewMaterialModule
  ],
  declarations: [
    TraineeOverviewComponent,
    TraineeAccessTrainingComponent,
    TraineeTrainingsTableComponent
  ],
  providers: [
    TrainingInstanceGetterService,
    TrainingRunGetterService,
    LevelGetterService
  ]
})

export class TraineeOverviewModule {

}
