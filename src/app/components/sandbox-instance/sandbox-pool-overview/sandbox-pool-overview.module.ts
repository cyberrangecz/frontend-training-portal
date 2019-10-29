import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {Kypo2TableModule} from 'kypo2-table';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-breadcrumb-resolver.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {PoolConcreteService} from '../../../services/sandbox-instance/pool-concrete.service';
import {PoolService} from '../../../services/sandbox-instance/pool.service';
import {SandboxPoolOverviewMaterialModule} from './sandbox-pool-overview-material.module';
import { SandboxPoolOverviewRoutingModule } from './sandbox-pool-overview-routing.module';
import {SandboxPoolOverviewComponent} from './sandbox-pool-overview.component';

@NgModule({
  declarations: [SandboxPoolOverviewComponent],
  imports: [
    CommonModule,
    SandboxPoolOverviewRoutingModule,
    SandboxPoolOverviewMaterialModule,
    SandboxInstanceFacadeModule,
    Kypo2TableModule
  ],
  providers: [
    PoolResolver,
    PoolBreadcrumbResolver,
    { provide: PoolService, useClass: PoolConcreteService }
  ]
})
export class SandboxPoolOverviewModuleModule { }
