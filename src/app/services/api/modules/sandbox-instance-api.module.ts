import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxInstanceMapper} from '../../mappers/sandbox-instance-mapper.service';
import {SandboxInstanceApi} from '../sandbox-instance-api.service';

/**
 * Module grouping providers necessary for using sandbox instance api service
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SandboxInstanceApi,
    SandboxInstanceMapper
  ]
})
export class SandboxInstanceApiModule {

}
