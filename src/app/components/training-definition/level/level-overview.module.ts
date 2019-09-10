import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LevelOverviewMaterialModule} from './level-overview-material.module';
import {LevelOverviewRoutingModule} from './level-overview-routing.module';
import {LevelEditModule} from './level-edit/level-edit.module';
import {TrainingLevelStepperComponent} from './training-level-stepper/training-level-stepper.component';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {LevelEditService} from '../../../services/training-definition/level-edit.service';
import {SharedModule} from '../../shared/shared.module';
import { LevelOverviewComponent } from './level-overview/level-overview.component';
import {PipesModule} from '../../../pipes/pipes.module';
import {LevelEditGuard} from '../../../services/guards/level-edit-guard.service';
import { LevelControlsComponent } from './level-controls/level-controls.component';
import {LevelEditLeaveGuard} from '../../../services/guards/level-edit-leave-guard.service';
import {Kypo2StepperModule} from 'kypo2-stepper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    LevelOverviewRoutingModule,
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
    LevelEditGuard,
    LevelEditLeaveGuard
  ],
  entryComponents: [
    UnsavedChangesDialogComponent,
  ]
})

export class LevelOverviewModule {

}
