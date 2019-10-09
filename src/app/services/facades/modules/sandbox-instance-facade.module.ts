import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxInstanceMapper} from '../../mappers/sandbox-instance-mapper.service';
import {SandboxInstanceFacade} from '../sandbox-instance-facade.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SandboxInstanceFacade,
    SandboxInstanceMapper
  ]
})
export class SandboxInstanceFacadeModule {

}
