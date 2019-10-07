import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxPoolOverviewRoutingModule } from './sandbox-pool-overview-routing.module';
import {SandboxPoolOverviewMaterialModule} from './sandbox-pool-overview-material.module';
import {SandboxPoolOverviewComponent} from './sandbox-pool-overview.component';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {PoolService} from '../../../services/sandbox-instance/pool.service';
import {PoolConcreteService} from '../../../services/sandbox-instance/pool-concrete.service';

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
    { provide: PoolService, useClass: PoolConcreteService }
  ]
})
export class SandboxPoolOverviewModuleModule { }
