import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingInstanceFacade} from '../training-instance-facade.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {TrainingInstanceMapper} from '../../mappers/training-instance-mapper.service';
import {DownloadService} from '../../shared/download.service';
import {TrainingDefinitionMapper} from '../../mappers/training-definition-mapper.service';
import {LevelMapper} from '../../mappers/level-mapper.service';

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
