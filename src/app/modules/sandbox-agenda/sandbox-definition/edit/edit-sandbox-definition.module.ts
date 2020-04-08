import {NgModule} from '@angular/core';
import {EditSandboxDefinitionRoutingModule} from './edit-sandbox-definition-routing.module';
import {EditSandboxDefinitionComponentsModule} from 'kypo-sandbox-agenda';

@NgModule({
  imports: [
    EditSandboxDefinitionComponentsModule,
    EditSandboxDefinitionRoutingModule
  ]
})
export class EditSandboxDefinitionModule {

}
