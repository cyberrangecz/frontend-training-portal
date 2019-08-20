import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingRunDetailRoutingModule} from './training-run-detail-routing.module';
import {LevelModule} from './level/level.module';
import {TrainingRunLevelsGuard} from '../../../services/guards/training-run-levels-guard.service';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingRunDetailComponentModule} from './training-run-detail-component.module';

@NgModule({
  imports: [
    CommonModule,
    LevelModule,
    TrainingRunDetailComponentModule,
    TrainingDefinitionFacadeModule,
    TrainingRunFacadeModule,
    TrainingRunDetailRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunLevelsGuard,
  ]
})
export class TrainingRunDetailModule { }
