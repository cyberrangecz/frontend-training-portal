import {NgModule} from '@angular/core';
import {SandboxPoolEditComponentsModule} from 'kypo-sandbox-agenda';
import {SandboxPoolEditRoutingModule} from './sandbox-pool-edit-routing.module';

@NgModule({
  imports: [
    SandboxPoolEditComponentsModule,
    SandboxPoolEditRoutingModule
  ]
})
export class SandboxPoolEditModule {

}
