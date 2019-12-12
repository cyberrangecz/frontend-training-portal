import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSandboxDefinitionComponent} from './create-sandbox-definition.component';
import {CreateSandboxDefinitionRoutingModule} from './create-sandbox-definition-routing.module';
import {CreateSandboxDefinitionMaterial} from './create-sandbox-definition-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SandboxDefinitionService} from '../../../services/shared/sandbox-definition.service';
import {SandboxDefinitionConcreteService} from '../../../services/sandbox-definition/sandbox-definition.concrete.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateSandboxDefinitionRoutingModule,
    CreateSandboxDefinitionMaterial
  ],
  declarations: [
    CreateSandboxDefinitionComponent
  ],
  providers: [
    {provide: SandboxDefinitionService, useClass: SandboxDefinitionConcreteService}
  ]
})
export class CreateSandboxDefinitionModule {

}
