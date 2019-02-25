import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingInstanceFacade} from '../training-instance-facade.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {TrainingInstanceMapper} from '../../mappers/training-instance-mapper.service';
import {UserMapper} from '../../mappers/user.mapper.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TrainingInstanceFacade,
    TrainingInstanceMapper,
    TrainingRunMapper,
    UserMapper
  ]
})
export class TrainingInstanceFacadeModule {

}
