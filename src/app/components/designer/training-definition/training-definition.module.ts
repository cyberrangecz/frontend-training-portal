import {NgModule} from "@angular/core";
import { TrainingDefinitionComponent } from './training-definition.component';
import {CommonModule} from "@angular/common";
import {TrainingDefinitionMaterialModule} from "./training-definition-material.module";
import {TrainingDefinitionRoutingModule} from "./training-definition-routing.module";
import { TrainingConfigurationComponent } from './training-configuration/training-configuration.component';
import { TrainingLevelStepperComponent } from './levels/training-level-stepper/training-level-stepper.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { AuthorsPickerComponent } from './training-configuration/authors-picker/authors-picker.component';
import { SandboxDefinitionPickerComponent } from './training-configuration/sandbox-definition-picker/sandbox-definition-picker.component';
import {LevelConfigurationModule} from "./levels/level-configuration/level-configuration.module";
import {PipesModule} from "../../../pipes/pipes.module";
import { UnsavedChangesDialogComponent } from './unsaved-changes-dialog/unsaved-changes-dialog.component';
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import { StateChangeDialogComponent } from './state-change-dialog/state-change-dialog.component';
import { EditViewGroupComponent } from './training-configuration/edit-view-group/edit-view-group.component';
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrainingDefinitionRoutingModule,
    TrainingDefinitionMaterialModule,
    LevelConfigurationModule,
    PipesModule
  ],
  declarations: [
    TrainingDefinitionComponent,
    TrainingConfigurationComponent,
    TrainingLevelStepperComponent,
    AuthorsPickerComponent,
    SandboxDefinitionPickerComponent,
    UnsavedChangesDialogComponent,
    DeleteDialogComponent,
    StateChangeDialogComponent,
    EditViewGroupComponent
  ],
  providers: [
    TrainingDefinitionGuard
  ],
  entryComponents: [
    SandboxDefinitionPickerComponent,
    AuthorsPickerComponent,
    UnsavedChangesDialogComponent,
    DeleteDialogComponent,
    StateChangeDialogComponent,
    EditViewGroupComponent
  ]
})

export class TrainingDefinitionModule {

}
