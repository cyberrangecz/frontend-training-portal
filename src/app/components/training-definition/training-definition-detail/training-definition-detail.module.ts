import {NgModule} from '@angular/core';
import { TrainingDefinitionDetailComponent } from './training-definition-detail.component';
import {CommonModule} from '@angular/common';
import {TrainingDefinitionDetailMaterialModule} from './training-definition-detail-material.module';
import {TrainingDefinitionDetailRoutingModule} from './training-definition-detail-routing.module';
import { TrainingDefinitionEditComponent } from './training-definition-edit/training-definition-edit.component';
import { TrainingLevelStepperComponent } from './level/training-level-stepper/training-level-stepper.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { AuthorsPickerComponent } from './training-definition-edit/authors-picker/authors-picker.component';
import { SandboxDefinitionPickerComponent } from './training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import {LevelEditModule} from './level/level-edit/level-edit.module';
import {PipesModule} from '../../../pipes/pipes.module';
import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog/unsaved-changes-dialog.component';
import { EditBetaTestingGroupComponent } from './training-definition-edit/edit-beta-testing-group/edit-beta-testing-group.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {LevelsDefinitionService} from '../../../services/training-definition/levels-definition.service';
import {TrainingDefinitionAccessGuardService} from '../../../services/guards/training-definition-access-guard.service';
import {SandboxDefinitionFacadeModule} from '../../../services/facades/modules/sandbox-definition-facade.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrainingDefinitionDetailRoutingModule,
    TrainingDefinitionDetailMaterialModule,
    SandboxDefinitionFacadeModule,
    LevelEditModule,
    PipesModule
  ],
  declarations: [
    TrainingDefinitionDetailComponent,
    TrainingDefinitionEditComponent,
    TrainingLevelStepperComponent,
    AuthorsPickerComponent,
    SandboxDefinitionPickerComponent,
    UnsavedChangesDialogComponent,
    EditBetaTestingGroupComponent
  ],
  providers: [
    TrainingDefinitionLeaveGuard,
    TrainingDefinitionAccessGuardService,
    LevelsDefinitionService
  ],
  entryComponents: [
    SandboxDefinitionPickerComponent,
    AuthorsPickerComponent,
    UnsavedChangesDialogComponent,
    EditBetaTestingGroupComponent
  ]
})

export class TrainingDefinitionDetailModule {

}
