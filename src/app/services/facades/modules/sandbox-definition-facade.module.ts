import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadService} from '../../shared/upload.service';
import {SandboxDefinitionFacade} from '../sandbox-definition-facade.service';
import {SandboxDefinitionMapperService} from '../../mappers/sandbox-definition-mapper.service';

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
