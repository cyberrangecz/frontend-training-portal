import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingRunMaterialModule} from "./training-run-material.module";
import {TrainingRunRoutingModule} from "./training-run-routing.module";
import { TrainingRunComponent } from './training-run.component';
import {ActiveTrainingRunLevelsService} from "../../../services/active-training-run-levels.service";

@NgModule({
  imports: [
    CommonModule,
    TrainingRunMaterialModule,
    TrainingRunRoutingModule
  ],
  declarations: [TrainingRunComponent],
  providers: [
    ActiveTrainingRunLevelsService
  ]
})
export class TrainingRunModule { }
