import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {UserMapper} from '../../mappers/user.mapper.service';
import {TrainingRunFacade} from '../training-run-facade.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TrainingRunFacade,
    TrainingRunMapper,
    UserMapper,
    LevelMapper
  ]
})
export class TrainingRunFacadeModule {

}
