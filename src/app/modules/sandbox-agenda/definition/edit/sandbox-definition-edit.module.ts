import { NgModule } from '@angular/core';
import { SandboxDefinitionEditComponentsModule } from '@muni-kypo-crp/sandbox-agenda/sandbox-definition-edit';
import { SandboxDefinitionEditRoutingModule } from './sandbox-definition-edit-routing.module';

@NgModule({
  imports: [SandboxDefinitionEditComponentsModule, SandboxDefinitionEditRoutingModule],
})
export class SandboxDefinitionEditModule {}
