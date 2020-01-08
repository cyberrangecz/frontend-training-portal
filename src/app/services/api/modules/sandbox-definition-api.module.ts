import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxDefinitionMapper} from '../../mappers/sandbox-definition-mapper.service';
import {UploadService} from '../../shared/upload.service';
import {SandboxDefinitionApi} from '../sandbox-definition-api.service';

/**
 * Module grouping providers necessary for using sandbox definition api service
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SandboxDefinitionApi,
    SandboxDefinitionMapper,
    UploadService
  ]
})
export class SandboxDefinitionApiModule {

}
