import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TrainingRunGameLevelService} from "../../../../services/trainee/training-run-game-level.service";
import {TrainingRunAssessmentLevelService} from "../../../../services/trainee/training-run-assessment-level.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunGameLevelService,
    TrainingRunAssessmentLevelService
  ],
})

export class TrainingRunLevelModule {
}
