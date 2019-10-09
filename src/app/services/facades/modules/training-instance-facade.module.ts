import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {TrainingDefinitionMapper} from '../../mappers/training-definition-mapper.service';
import {TrainingInstanceMapper} from '../../mappers/training-instance-mapper.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {DownloadService} from '../../shared/download.service';
import {TrainingInstanceFacade} from '../training-instance-facade.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TrainingInstanceFacade,
    TrainingInstanceMapper,
    TrainingDefinitionMapper,
    LevelMapper,
    TrainingRunMapper,
    DownloadService
  ]
})
export class TrainingInstanceFacadeModule {

}
