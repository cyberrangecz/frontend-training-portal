import {NgModule} from "@angular/core";
import {TrainingPreviewComponent} from "./training-preview.component";
import {CommonModule} from "@angular/common";
import {TrainingPreviewGuard} from "../../../services/guards/training-preview-guard.service";
import {ActiveTrainingRunService} from "../../../services/trainee/active-training-run.service";
import {PreviewTrainingRunService} from "../../../services/designer/preview-training-run.service";
import {TrainingRunComponentModule} from "../../trainee/training-run/training-run-component.module";
import {TrainingRunGameLevelService} from "../../../services/trainee/training-run-game-level.service";
import {TrainingRunAssessmentLevelService} from "../../../services/trainee/training-run-assessment-level.service";
import {PreviewAssessmentLevelService} from "../../../services/designer/preview-assessment-level.service";
import {PreviewGameLevelService} from "../../../services/designer/preview-game-level.service";
import {TrainingPreviewRoutingModule} from "./training-preview-routing.module";


@NgModule({
  imports: [
    CommonModule,
    TrainingRunComponentModule,
    TrainingPreviewRoutingModule
  ],
  declarations: [
    TrainingPreviewComponent,
  ],
  providers: [
    TrainingPreviewGuard,
    { provide: TrainingRunGameLevelService, useClass: PreviewGameLevelService },
    { provide: TrainingRunAssessmentLevelService, useClass: PreviewAssessmentLevelService },
    { provide: ActiveTrainingRunService, useClass: PreviewTrainingRunService }
  ],
})
export class TrainingPreviewModule {

}
