import {NgModule} from '@angular/core';
import { TrainingDefinitionEditOverviewComponent } from './training-definition-edit-overview.component';
import {CommonModule} from '@angular/common';
import {TrainingDefinitionEditOverviewMaterialModule} from './training-definition-edit-overview-material.module';
import {TrainingDefinitionEditOverviewRoutingModule} from './training-definition-edit-overview-routing.module';
import { TrainingDefinitionEditComponent } from './training-definition-edit/training-definition-edit.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SandboxDefinitionPickerComponent } from './training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import {PipesModule} from '../../../pipes/pipes.module';
import { UnsavedChangesDialogComponent } from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {SandboxDefinitionFacadeModule} from '../../../services/facades/modules/sandbox-definition-facade.module';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {LevelOverviewModule} from './levels-edit/level-overview.module';
import { TrainingDefinitionEditControlsComponent } from './training-definition-edit-controls/training-definition-edit-controls.component';
import {TrainingDefinitionEditService} from '../../../services/training-definition/training-definition-edit.service';
import {AuthorsAssignService} from '../../../services/training-definition/authors-assign.service';
import {UserAssignService} from '../../../services/shared/user-assign.service';
import {UsersAssignModule} from '../../shared/user-assign/users-assign.module';

/**
 * Module containing components and services of training definition detail/edt/new actions. Contains routing to level modules
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UsersAssignModule,
    TrainingDefinitionEditOverviewRoutingModule,
    TrainingDefinitionEditOverviewMaterialModule,
    LevelOverviewModule,
    SandboxDefinitionFacadeModule,
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
    TrainingDefinitionLeaveGuard,
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    {provide: UserAssignService, useClass: AuthorsAssignService},
  ],
  entryComponents: [
    SandboxDefinitionPickerComponent,
    UnsavedChangesDialogComponent,
  ]
})

export class TrainingDefinitionEditOverviewModule {
}
