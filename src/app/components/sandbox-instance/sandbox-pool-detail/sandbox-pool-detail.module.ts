import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {PoolBreadcrumbResolver} from '../../../services/resolvers/pool-breadcrumb-resolver.service';
import {PoolRequestBreadcrumbResolver} from '../../../services/resolvers/pool-request-breadcrumb-resolver.service';
import {PoolRequestResolver} from '../../../services/resolvers/pool-request-resolver.service';
import {PoolResolver} from '../../../services/resolvers/pool-resolver.service';
import {SandboxInstanceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-breadcrumb-resolver.service';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolver.service';
import {PoolCreationRequestsConcreteService} from '../../../services/sandbox-instance/pool-creation-requests-concrete.service';
import {PoolRequestService} from '../../../services/sandbox-instance/pool-request.service';
import {SandboxInstanceConcreteService} from '../../../services/sandbox-instance/sandbox-instance-concrete.service';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox-instance.service';
import {SandboxPoolDetailMaterialModule} from './sandbox-pool-detail-material.module';
import {SandboxPoolDetailRoutingModule} from './sandbox-pool-detail-routing.module';
import { SandboxPoolDetailComponent } from './sandbox-pool-detail.component';
import {PoolCleanupRequestsConcreteService} from '../../../services/sandbox-instance/pool-cleanup-requests-concrete.service';

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
    PoolCreationRequestsConcreteService,
    PoolCleanupRequestsConcreteService,
    { provide: SandboxInstanceService, useClass: SandboxInstanceConcreteService },
  ]
})
export class SandboxInstanceOverviewModule { }
