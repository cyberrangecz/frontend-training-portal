import {NgModule} from '@angular/core';
import { TrainingDefinitionEditContainerComponent } from './training-definition-edit-container.component';
import {CommonModule} from '@angular/common';
import {TrainingDefinitionEditMaterialModule} from './training-definition-edit-material.module';
import {TrainingDefinitionEditRoutingModule} from './training-definition-edit-routing.module';
import { TrainingDefinitionEditComponent } from './training-definition-edit/training-definition-edit.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthorsPickerComponent } from './training-definition-edit/authors-picker/authors-picker.component';
import { SandboxDefinitionPickerComponent } from './training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import {PipesModule} from '../../../pipes/pipes.module';
import { UnsavedChangesDialogComponent } from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { EditBetaTestingGroupComponent } from './training-definition-edit/edit-beta-testing-group/edit-beta-testing-group.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {SandboxDefinitionFacadeModule} from '../../../services/facades/modules/sandbox-definition-facade.module';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {LevelOverviewModule} from '../level/level-overview.module';
import { TrainingDefinitionEditControlsComponent } from './training-definition-edit-controls/training-definition-edit-controls.component';
import {TrainingDefinitionEditService} from '../../../services/training-definition/training-definition-edit.service';
import {MatExpansionModule} from '@angular/material/expansion';

/**
 * Module containing components and services of training definition detail/edt/new actions. Contains routing to level modules
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrainingDefinitionEditRoutingModule,
    TrainingDefinitionEditMaterialModule,
    LevelOverviewModule,
    SandboxDefinitionFacadeModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule
  ],
  declarations: [
    TrainingDefinitionEditContainerComponent,
    TrainingDefinitionEditComponent,
    AuthorsPickerComponent,
    SandboxDefinitionPickerComponent,
    EditBetaTestingGroupComponent,
    TrainingDefinitionEditControlsComponent
  ],
  providers: [
    TrainingDefinitionEditService,
    TrainingDefinitionLeaveGuard,
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver
  ],
  entryComponents: [
    SandboxDefinitionPickerComponent,
    AuthorsPickerComponent,
    UnsavedChangesDialogComponent,
    EditBetaTestingGroupComponent
  ]
})

export class TrainingDefinitionEditModule {
}
