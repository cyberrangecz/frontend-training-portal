import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ngfModule} from 'angular-file';
import {SharedDirectivesModule} from '../../../directives/shared-directives.module';
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
import {TrainingDefinitionApi} from '../../../services/api/training-definition-api.service';
import {TrainingInstanceApi} from '../../../services/api/training-instance-api.service';
import {KypoControlsModule} from 'kypo-controls';

/**
 * Module containing components and providers for training definition overview.
 */
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ngfModule,
      KypoPipesModule,
      SharedDirectivesModule,
      TrainingDefinitionOverviewRoutingModule,
      TrainingDefinitionOverviewMaterialModule,
      ReactiveFormsModule,
      Kypo2TableModule,
      KypoControlsModule
    ],
  declarations: [
    TrainingDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
  ],
  providers: [
    TrainingDefinitionApi,
    TrainingInstanceApi,
    FileUploadProgressService,
    { provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService }
  ]
})

export class TrainingDefinitionOverviewModule {

}
