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
import {TrainingDefinitionAccessGuard} from '../../../services/guards/training-definition-access-guard.service';
import {SandboxDefinitionFacadeModule} from '../../../services/facades/modules/sandbox-definition-facade.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrainingDefinitionEditRoutingModule,
    TrainingDefinitionEditMaterialModule,
    SandboxDefinitionFacadeModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    TrainingDefinitionEditContainerComponent,
    TrainingDefinitionEditComponent,
    AuthorsPickerComponent,
    SandboxDefinitionPickerComponent,
    EditBetaTestingGroupComponent
  ],
  providers: [
    TrainingDefinitionLeaveGuard,
    TrainingDefinitionAccessGuard,
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
