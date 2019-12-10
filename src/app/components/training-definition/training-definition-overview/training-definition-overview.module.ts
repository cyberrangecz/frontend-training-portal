import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngfModule } from 'angular-file';
import { SharedDirectivesModule } from '../../../directives/shared-directives.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TrainingDefinitionFacadeModule } from '../../../services/facades/modules/training-definition-facade.module';
import { TrainingInstanceFacadeModule } from '../../../services/facades/modules/training-instance-facade.module';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';
import { TrainingDefinitionOverviewMaterialModule } from './training-definition-overview-material.module';
import { TrainingDefinitionOverviewRoutingModule } from './training-definition-overview-routing.module';
import { TrainingDefinitionOverviewComponent } from './training-definition-overview.component';
import { TrainingDefinitionDetailComponent } from './training-definition-detail/training-definition-detail.component';
import { TrainingDefinitionUploadDialogComponent } from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import { Kypo2TableModule } from 'kypo2-table';
import { TrainingDefinitionService } from '../../../services/shared/training-definition.service';
import { TrainingDefinitionConcreteService } from '../../../services/training-definition/training-definition.concrete.service';
import { TrainingDefinitionOverviewControlsComponent } from './training-definition-overview-controls/training-definition-overview-controls.component';

/**
 * Module containing components and services for training definition overview with routing to inner feature modules.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ngfModule,
    PipesModule,
    SharedDirectivesModule,
    TrainingDefinitionOverviewRoutingModule,
    TrainingDefinitionOverviewMaterialModule,
    TrainingDefinitionFacadeModule,
    TrainingInstanceFacadeModule,
    ReactiveFormsModule,
    Kypo2TableModule
  ],
  declarations: [
    TrainingDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    StateChangeDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
    TrainingDefinitionOverviewControlsComponent
  ],
  providers: [
    { provide: TrainingDefinitionService, useClass: TrainingDefinitionConcreteService }
  ],
  entryComponents: [
    TrainingDefinitionUploadDialogComponent,
    StateChangeDialogComponent,
    CloneDialogComponent,
    TrainingDefinitionDetailComponent,
    TrainingDefinitionOverviewControlsComponent
  ]
})

export class TrainingDefinitionOverviewModule {

}
