import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TrainingRunGameLevelService} from "../../../../services/trainee/training-run-game-level.service";
import {TrainingRunAssessmentLevelService} from "../../../../services/trainee/training-run-assessment-level.service";
import {TrainingRunLevelComponentModule} from "./training-run-level-component.module";
import {CountdownTimerModule} from "ngx-countdown-timer";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainingRunLevelComponentModule,
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
