import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {SandboxDefinitionApiModule} from '../../../services/api/modules/sandbox-definition-api.module';
import {TrainingDefinitionCanDeactivate} from '../../../services/guards/training-definition-can-deactivate.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {AuthorsAssignService} from '../../../services/training-definition/authors-assign/authors-assign.service';
import {TrainingDefinitionEditService} from '../../../services/training-definition/edit/training-definition-edit.service';
import {SharedModule} from '../../shared/shared.module';
import { UnsavedChangesDialogComponent } from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {LevelOverviewModule} from './levels-edit/level-overview.module';
import { TrainingDefinitionEditControlsComponent } from './training-definition-edit-controls/training-definition-edit-controls.component';
import {TrainingDefinitionEditOverviewMaterialModule} from './training-definition-edit-overview-material.module';
import {TrainingDefinitionEditOverviewRoutingModule} from './training-definition-edit-overview-routing.module';
import { TrainingDefinitionEditOverviewComponent } from './training-definition-edit-overview.component';
import { SandboxDefinitionPickerComponent } from './training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import { TrainingDefinitionEditComponent } from './training-definition-edit/training-definition-edit.component';
import {Kypo2UserAssignModule, Kypo2UserAssignService} from 'kypo2-user-assign';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    Kypo2UserAssignModule,
    TrainingDefinitionEditOverviewRoutingModule,
    TrainingDefinitionEditOverviewMaterialModule,
    LevelOverviewModule,
    SandboxDefinitionApiModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TrainingDefinitionEditOverviewComponent,
    TrainingDefinitionEditComponent,
    SandboxDefinitionPickerComponent,
    TrainingDefinitionEditControlsComponent,
  ],
  providers: [
    TrainingDefinitionEditService,
    TrainingDefinitionCanDeactivate,
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    {provide: Kypo2UserAssignService, useClass: AuthorsAssignService},
  ],
  entryComponents: [
    SandboxDefinitionPickerComponent,
    UnsavedChangesDialogComponent,
  ]
})

export class TrainingDefinitionEditOverviewModule {
}
