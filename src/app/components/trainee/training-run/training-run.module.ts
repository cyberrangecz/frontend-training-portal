import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingRunRoutingModule} from "./training-run-routing.module";
import {TrainingRunLevelModule} from "./training-run-level/training-run-level.module";
import {TrainingRunLevelsGuard} from "../../../services/guards/training-run-levels-guard.service";
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingRunComponentModule} from "./training-run-component.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingRunLevelModule,
    TrainingRunComponentModule,
    TrainingDefinitionFacadeModule,
    TrainingRunFacadeModule,
    TrainingRunRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunLevelsGuard,
  ]
})
export class TrainingRunModule { }
