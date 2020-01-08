import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {UserMapper} from '../../mappers/user.mapper.service';
import {TrainingRunApi} from '../training-run-api.service';

/**
 * Module grouping providers necessary for using training run api service
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TrainingRunApi,
    TrainingRunMapper,
    UserMapper,
    LevelMapper
  ]
})
export class TrainingRunApiModule {

}
