import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SandboxPoolDetailRoutingModule} from './sandbox-pool-detail-routing.module';
import {SandboxPoolDetailMaterialModule} from './sandbox-pool-detail-material.module';
import { SandboxPoolDetailComponent } from './sandbox-pool-detail.component';
import { PoolRequestDetailComponent } from '../pool-request-detail/pool-request-detail.component';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox-instance.service';
import {SandboxInstanceConcreteService} from '../../../services/sandbox-instance/sandbox-instance-concrete.service';
import {Kypo2TableModule} from 'kypo2-table';
import {PoolResolver} from '../../../services/resolvers/pool-resolver.service';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/pool-breadcrumb-resolver.service';
import {PoolRequestsService} from '../../../services/sandbox-instance/pool-requests.service';
import {PoolRequestsConcreteService} from '../../../services/sandbox-instance/pool-requests-concrete.service';
import {PoolRequestResolver} from '../../../services/resolvers/pool-request-resolver.service';
import {PoolRequestBreadcrumbResolver} from '../../../services/resolvers/pool-request-breadcrumb-resolver.service';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolver.service';
import {SandboxInstanceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-breadcrumb-resolver.service';

@NgModule({
  declarations: [SandboxPoolDetailComponent],
  imports: [
    CommonModule,
    SandboxPoolDetailRoutingModule,
    SandboxPoolDetailMaterialModule,
    Kypo2TableModule,
    SandboxInstanceFacadeModule
  ],
  providers: [
    PoolResolver,
    PoolRequestResolver,
    PoolRequestBreadcrumbResolver,
    SandboxInstanceResolver,
    SandboxInstanceBreadcrumbResolver,
    { provide: SandboxInstanceService, useClass: SandboxInstanceConcreteService },
    { provide: PoolRequestsService, useClass: PoolRequestsConcreteService }
  ]
})
export class SandboxInstanceOverviewModule { }
