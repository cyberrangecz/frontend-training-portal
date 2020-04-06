import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ngfModule} from 'angular-file';
import {KypoPipesModule} from 'kypo-common';
import {CloneDialogComponent} from './clone-dialog/clone-dialog.component';
import {TrainingDefinitionOverviewMaterialModule} from './training-definition-overview-material.module';
import {TrainingDefinitionOverviewRoutingModule} from './training-definition-overview-routing.module';
import {TrainingDefinitionOverviewComponent} from './training-definition-overview.component';
import {TrainingDefinitionDetailComponent} from './training-definition-detail/training-definition-detail.component';
import {TrainingDefinitionUploadDialogComponent} from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import {Kypo2TableModule} from 'kypo2-table';
import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {TrainingDefinitionConcreteService} from '../../../services/training-definition/overview/training-definition.concrete.service';
import {FileUploadProgressService} from '../../../services/shared/file-upload-progress.service';
import {KypoControlsModule} from 'kypo-controls';
import {KypoTrainingApiModule} from 'kypo-training-api';
import {environment} from '../../../../environments/environment';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ngfModule,
      KypoPipesModule,
      TrainingDefinitionOverviewRoutingModule,
      TrainingDefinitionOverviewMaterialModule,
      ReactiveFormsModule,
      Kypo2TableModule,
      KypoControlsModule,
      KypoTrainingApiModule.forRoot(environment.trainingApiConfig)
    ],
  declarations: [
    TrainingDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
  ],
  providers: [
    FileUploadProgressService,
    { provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService }
  ]
})

export class TrainingDefinitionOverviewModule {

}
