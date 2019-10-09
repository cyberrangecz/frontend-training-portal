import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Kypo2StepperModule} from 'kypo2-stepper';
import {PipesModule} from '../../../../pipes/pipes.module';
import {LevelEditService} from '../../../../services/training-definition/level-edit.service';
import {SharedModule} from '../../../shared/shared.module';
import {UnsavedChangesDialogComponent} from '../../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import { LevelControlsComponent } from './level-controls/level-controls.component';
import {LevelEditModule} from './level-edit/level-edit.module';
import {LevelOverviewMaterialModule} from './level-overview-material.module';
import { LevelOverviewComponent } from './level-overview/level-overview.component';
import {TrainingLevelStepperComponent} from './training-level-stepper/training-level-stepper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    LevelOverviewMaterialModule,
    LevelEditModule,
    ReactiveFormsModule,
    SharedModule,
    Kypo2StepperModule
  ],
  declarations: [
    TrainingLevelStepperComponent,
    LevelOverviewComponent,
    LevelControlsComponent,
  ],
  providers: [
    LevelEditService,
  ],
  exports: [
    LevelOverviewComponent
  ],
  entryComponents: [
    UnsavedChangesDialogComponent,
  ]
})

export class LevelOverviewModule {

}
