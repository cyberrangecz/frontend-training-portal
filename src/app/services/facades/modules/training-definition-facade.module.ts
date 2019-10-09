import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {TrainingDefinitionMapper} from '../../mappers/training-definition-mapper.service';
import {DownloadService} from '../../shared/download.service';
import {UploadService} from '../../shared/upload.service';
import {TrainingDefinitionFacade} from '../training-definition-facade.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TrainingDefinitionFacade,
    DownloadService,
    UploadService,
    LevelMapper,
    TrainingDefinitionMapper
  ]
})
export class TrainingDefinitionFacadeModule {

}
