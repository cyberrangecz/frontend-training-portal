import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resolver.service';
import {SandboxInstanceDetailRoutingModule} from './sandbox-instance-detail-routing.module';
import {SandboxInstanceDetailComponent} from './sandbox-instance-detail.component';
import {Kypo2TopologyGraphModule} from 'kypo2-topology-graph';
import {environment} from '../../../../environments/environment';
import {SandboxInstanceResourceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance-resource.service';
import {SandboxInstanceResourceConcreteService} from '../../../services/sandbox-instance/sandbox/sandbox-instance-resource-concrete.service';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxInstanceResourceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resource-resolver.service';
import {SandboxInstanceResourceBreadcrumbResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resource-breadcrumb-resolver.service';

/**
 * Contains components and providers for sandbox instance detail page
 */
@NgModule({
  declarations: [SandboxInstanceDetailComponent],
  imports: [
    CommonModule,
    SandboxInstanceDetailRoutingModule,
    Kypo2TableModule,
    Kypo2TopologyGraphModule.forRoot(environment.kypo2TopologyConfig)
  ],
  providers: [
    SandboxInstanceResolver,
    SandboxInstanceResourceResolver,
    SandboxInstanceResourceBreadcrumbResolver,
    {provide: SandboxInstanceResourceService, useClass: SandboxInstanceResourceConcreteService}
  ]
})
export class SandboxInstanceDetailModule { }
