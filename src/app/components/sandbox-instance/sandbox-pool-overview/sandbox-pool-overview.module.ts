import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2TableModule} from 'kypo2-table';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-breadcrumb-resolver.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {PoolOverviewConcreteService} from '../../../services/sandbox-instance/pool/pool-overview-concrete.service';
import {PoolOverviewService} from '../../../services/sandbox-instance/pool/pool-overview.service';
import {SandboxPoolOverviewRoutingModule} from './sandbox-pool-overview-routing.module';
import {SandboxPoolOverviewComponent} from './sandbox-pool-overview.component';
import {KypoControlsModule} from 'kypo-controls';
import {KypoSandboxApiModule, KypoSandboxConfig} from 'kypo-sandbox-api';
import {environment} from '../../../../environments/environment';

/**
 * Module containing components and providers for sandbox pool overview page
 */
@NgModule({
  declarations: [SandboxPoolOverviewComponent],
    imports: [
      CommonModule,
      Kypo2TableModule,
      SandboxPoolOverviewRoutingModule,
      KypoControlsModule,
      KypoSandboxApiModule.forRoot(new KypoSandboxConfig(environment.sandboxRestBasePath))
    ],
  providers: [
    PoolResolver,
    PoolBreadcrumbResolver,
    { provide: PoolOverviewService, useClass: PoolOverviewConcreteService }
  ]
})
export class SandboxPoolOverviewModuleModule { }
