import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {Kypo2TableModule} from 'kypo2-table';
import {PoolRequestBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-breadcrumb-resolver.service';
import {PoolRequestResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-resolver.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {SandboxInstanceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-breadcrumb-resolver.service';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resolver.service';
import {PoolCreationRequestsPollingService} from '../../../services/sandbox-instance/pool-request/creation/pool-creation-requests-polling.service';
import {SandboxInstanceConcreteService} from '../../../services/sandbox-instance/sandbox/sandbox-instance-concrete.service';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance.service';
import {SandboxPoolDetailMaterialModule} from './sandbox-pool-detail-material.module';
import {SandboxPoolDetailRoutingModule} from './sandbox-pool-detail-routing.module';
import { SandboxPoolDetailComponent } from './sandbox-pool-detail.component';
import {PoolCleanupRequestsPollingService} from '../../../services/sandbox-instance/pool-request/cleanup/pool-cleanup-requests-polling.service';
import {SandboxInstanceApi} from '../../../services/api/sandbox-instance-api.service';

/**
 * Module containing component and providers for sandbox pool detail page
 */
@NgModule({
  declarations: [SandboxPoolDetailComponent],
  imports: [
    CommonModule,
    SandboxPoolDetailRoutingModule,
    SandboxPoolDetailMaterialModule,
    Kypo2TableModule,
  ],
  providers: [
    SandboxInstanceApi,
    PoolResolver,
    PoolRequestResolver,
    PoolRequestBreadcrumbResolver,
    SandboxInstanceResolver,
    SandboxInstanceBreadcrumbResolver,
    PoolCreationRequestsPollingService,
    PoolCleanupRequestsPollingService,
    { provide: SandboxInstanceService, useClass: SandboxInstanceConcreteService },
  ]
})
export class SandboxInstanceOverviewModule { }
