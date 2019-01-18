import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingRunFacade} from '../training-run-facade.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {LevelMapper} from '../../mappers/level-mapper.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TrainingRunFacade,
    TrainingRunMapper,
    LevelMapper
  ]
})
export class TrainingRunFacadeModule {

}
