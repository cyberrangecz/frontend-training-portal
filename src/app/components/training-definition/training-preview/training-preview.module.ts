import {NgModule} from '@angular/core';
import {TrainingPreviewComponent} from './training-preview.component';
import {CommonModule} from '@angular/common';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {PreviewTrainingRunService} from '../../../services/training-definition/preview-training-run.service';
import {TrainingRunDetailComponentModule} from '../../training-run/training-run-detail/training-run-detail-component.module';
import {TrainingRunGameLevelService} from '../../../services/training-run/training-run-game-level.service';
import {TrainingRunAssessmentLevelService} from '../../../services/training-run/training-run-assessment-level.service';
import {PreviewAssessmentLevelService} from '../../../services/training-definition/preview-assessment-level.service';
import {PreviewGameLevelService} from '../../../services/training-definition/preview-game-level.service';
import {TrainingPreviewRoutingModule} from './training-preview-routing.module';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';

/**
 * Module with components and providers for previewing training run (without allocating sandbox and backend communication)
 *
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
    { provide: ActiveTrainingRunService, useClass: PreviewTrainingRunService }
  ],
})
export class TrainingPreviewModule {

}
