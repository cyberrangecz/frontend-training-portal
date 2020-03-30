import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {SandboxDefinitionOverviewConcreteService} from '../../../services/sandbox-definition/sandbox-definition-overview-concrete.service';
import {SandboxDefinitionDetailComponent} from './sandbox-definition-detail/sandbox-definition-detail.component';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview.component';
import {KypoControlsModule} from 'kypo-controls';
import {KypoSandboxApiModule, KypoSandboxConfig} from 'kypo-sandbox-api';
import {environment} from '../../../../environments/environment';

/**
 * Module containing components and services for sandbox definition overview page
 */
@NgModule({
  imports: [
    CommonModule,
    SandboxDefinitionOverviewRoutingModule,
    Kypo2TableModule,
    KypoControlsModule,
    KypoSandboxApiModule.forRoot(new KypoSandboxConfig(environment.sandboxRestBasePath))
  ],
  declarations: [
    SandboxDefinitionOverviewComponent,
    SandboxDefinitionDetailComponent
  ],
  providers: [
    { provide: SandboxDefinitionOverviewService, useClass: SandboxDefinitionOverviewConcreteService }
  ],
})

export class SandboxDefinitionOverviewModule {

}
