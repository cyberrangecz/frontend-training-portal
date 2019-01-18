import {NgModule} from '@angular/core';
import {TrainingDefinitionFacade} from '../training-definition-facade.service';
import {DownloadService} from '../../download.service';
import {LevelMapper} from '../../mappers/level-mapper.service';
import {UploadService} from '../../upload.service';
import {TrainingDefinitionMapper} from '../../mappers/training-definition-mapper.service';
import {CommonModule} from '@angular/common';

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
