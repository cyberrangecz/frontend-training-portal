import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxDefinitionControlsComponent} from './sandbox-definition-controls/sandbox-definition-controls.component';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxDefinitionService} from '../../../services/sandbox-definition/sandbox-definition.service';
import {SandboxDefinitionConcreteService} from '../../../services/sandbox-definition/sandbox-definition.concrete.service';
import {SandboxDefinitionDetailComponent} from './sandbox-definition-detail/sandbox-definition-detail.component';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SandboxDefinitionOverviewMaterialModule} from './sandbox-definition-overview-material.module';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview.component';
import {SandboxDefinitionApi} from '../../../services/api/sandbox-definition-api.service';

/**
 * Module containing components and services for sandbox definition overview page
 */
@NgModule({
  imports: [
    CommonModule,
    SandboxDefinitionOverviewRoutingModule,
    SandboxDefinitionOverviewMaterialModule,
    Kypo2TableModule,
  ],
  declarations: [
    SandboxDefinitionOverviewComponent,
    SandboxDefinitionControlsComponent,
    SandboxDefinitionDetailComponent
  ],
  providers: [
    SandboxDefinitionApi,
    {provide: SandboxDefinitionService, useClass: SandboxDefinitionConcreteService}
  ],
})

export class SandboxDefinitionOverviewModule {

}
