import { NgModule } from '@angular/core';
import { EditSandboxDefinitionComponentsModule } from 'kypo-sandbox-agenda';
import { EditSandboxDefinitionRoutingModule } from './edit-sandbox-definition-routing.module';

@NgModule({
  imports: [EditSandboxDefinitionComponentsModule, EditSandboxDefinitionRoutingModule],
})
export class EditSandboxDefinitionModule {}
