import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {TrainingDefinitionMapper} from '../../mappers/training-definition-mapper.service';
import {TrainingInstanceMapper} from '../../mappers/training-instance-mapper.service';
import {TrainingRunMapper} from '../../mappers/training-run-mapper.service';
import {DownloadService} from '../../shared/download.service';
import {TrainingInstanceApi} from '../training-instance-api.service';

/**
 * Module grouping providers necessary for using training instance api service
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TrainingInstanceApi,
    TrainingInstanceMapper,
    TrainingDefinitionMapper,
    LevelMapper,
    TrainingRunMapper,
    DownloadService
  ]
})
export class TrainingInstanceApiModule {

}
