import { NgModule } from '@angular/core';
import { SandboxDefinitionEditComponentsModule } from 'kypo-sandbox-agenda/sandbox-definition-edit';
import { SandboxDefinitionEditRoutingModule } from './sandbox-definition-edit-routing.module';

@NgModule({
  imports: [SandboxDefinitionEditComponentsModule, SandboxDefinitionEditRoutingModule],
})
export class SandboxDefinitionEditModule {}
