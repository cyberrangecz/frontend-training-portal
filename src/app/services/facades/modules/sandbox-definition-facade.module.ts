import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxDefinitionMapperService} from '../../mappers/sandbox-definition-mapper.service';
import {UploadService} from '../../shared/upload.service';
import {SandboxDefinitionFacade} from '../sandbox-definition-facade.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SandboxDefinitionFacade,
    SandboxDefinitionMapperService,
    UploadService
  ]
})
export class SandboxDefinitionFacadeModule {

}
