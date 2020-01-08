import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {PreviewAssessmentLevelService} from '../../../services/training-definition/preview/preview-assessment-level.service';
import {PreviewGameLevelService} from '../../../services/training-definition/preview/preview-game-level.service';
import {PreviewTrainingRunService} from '../../../services/training-definition/preview/preview-training-run.service';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {TrainingRunAssessmentLevelService} from '../../../services/training-run/running/training-run-assessment-level.service';
import {TrainingRunGameLevelService} from '../../../services/training-run/running/training-run-game-level.service';
import {TrainingRunDetailComponentModule} from '../../training-run/training-run-detail/training-run-detail-component.module';
import {TrainingPreviewRoutingModule} from './training-preview-routing.module';
import {TrainingPreviewComponent} from './training-preview.component';

/**
 * Module containing components and providers for previewing training run (without allocating sandbox and backend communication)
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunDetailComponentModule,
    TrainingPreviewRoutingModule
  ],
  declarations: [
    TrainingPreviewComponent,
  ],
  providers: [
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    { provide: TrainingRunGameLevelService, useClass: PreviewGameLevelService },
    { provide: TrainingRunAssessmentLevelService, useClass: PreviewAssessmentLevelService },
    { provide: RunningTrainingRunService, useClass: PreviewTrainingRunService }
  ],
})
export class TrainingPreviewModule {

}
