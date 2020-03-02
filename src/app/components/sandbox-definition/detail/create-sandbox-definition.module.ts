import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSandboxDefinitionComponent} from './create-sandbox-definition.component';
import {CreateSandboxDefinitionRoutingModule} from './create-sandbox-definition-routing.module';
import {CreateSandboxDefinitionMaterial} from './create-sandbox-definition-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {SandboxDefinitionOverviewConcreteService} from '../../../services/sandbox-definition/sandbox-definition-overview-concrete.service';
import {SandboxDefinitionDetailService} from '../../../services/sandbox-definition/detail/sandbox-definition-detail.service';
import {SandboxDefinitionDetailConcreteService} from '../../../services/sandbox-definition/detail/sandbox-definition-detail-concrete.service';
import {ControlsModule} from '../../shared/controls/controls.module';

/**
 * Module for create sandbox definition page and components
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateSandboxDefinitionRoutingModule,
    CreateSandboxDefinitionMaterial,
    ControlsModule
  ],
  declarations: [
    CreateSandboxDefinitionComponent
  ],
  providers: [
    {provide: SandboxDefinitionDetailService, useClass: SandboxDefinitionDetailConcreteService}
  ]
})
export class CreateSandboxDefinitionModule {

}
