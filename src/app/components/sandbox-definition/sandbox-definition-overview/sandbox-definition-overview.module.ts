import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxDefinitionFacadeModule} from '../../../services/facades/modules/sandbox-definition-facade.module';
import {CreateSandboxDefinitionComponent} from '../create-sandbox-definition/create-sandbox-definition.component';
import { SandboxDefinitionControlsComponent } from './sandbox-definition-controls/sandbox-definition-controls.component';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxDefinitionService} from '../../../services/shared/sandbox-definition.service';
import {SandboxDefinitionConcreteService} from '../../../services/sandbox-definition/sandbox-definition.concrete.service';
import {SandboxDefinitionDetailComponent} from './sandbox-definition-detail/sandbox-definition-detail.component';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SandboxDefinitionOverviewMaterialModule} from './sandbox-definition-overview-material.module';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview.component';

/**
 * Module containing components and routing for sandbox definition agenda
 */
@NgModule({
  imports: [
    CommonModule,
    SandboxDefinitionOverviewRoutingModule,
    SandboxDefinitionOverviewMaterialModule,
    SandboxDefinitionFacadeModule,
    Kypo2TableModule,
  ],
  declarations: [
    SandboxDefinitionOverviewComponent,
    SandboxDefinitionControlsComponent,
    SandboxDefinitionDetailComponent
  ],
  providers: [
    {provide: SandboxDefinitionService, useClass: SandboxDefinitionConcreteService}
  ],
  entryComponents: [
    SandboxDefinitionDetailComponent
  ]
})

export class SandboxDefinitionOverviewModule {

}
