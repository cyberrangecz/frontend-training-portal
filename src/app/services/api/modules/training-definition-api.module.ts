import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {TrainingDefinitionMapper} from '../../mappers/training-definition-mapper.service';
import {DownloadService} from '../../shared/download.service';
import {UploadService} from '../../shared/upload.service';
import {TrainingDefinitionApi} from '../training-definition-api.service';

/**
 * Module grouping providers necessary for using training definition api service
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TrainingDefinitionApi,
    DownloadService,
    UploadService,
    LevelMapper,
    TrainingDefinitionMapper
  ]
})
export class TrainingDefinitionApiModule {

}
