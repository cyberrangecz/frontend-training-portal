import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {Kypo2TableModule} from 'kypo2-table';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-breadcrumb-resolver.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {PoolConcreteService} from '../../../services/sandbox-instance/pool/pool-concrete.service';
import {PoolService} from '../../../services/sandbox-instance/pool/pool.service';
import {SandboxPoolOverviewRoutingModule} from './sandbox-pool-overview-routing.module';
import {SandboxPoolOverviewComponent} from './sandbox-pool-overview.component';
import {SandboxInstanceApi} from '../../../services/api/sandbox-instance-api.service';

/**
 * Module containing components and providers for sandbox pool overview page
 */
@NgModule({
  declarations: [SandboxPoolOverviewComponent],
  imports: [
    CommonModule,
    SandboxPoolOverviewRoutingModule,
    Kypo2TableModule
  ],
  providers: [
    SandboxInstanceApi,
    PoolResolver,
    PoolBreadcrumbResolver,
    { provide: PoolService, useClass: PoolConcreteService }
  ]
})
export class SandboxPoolOverviewModuleModule { }
