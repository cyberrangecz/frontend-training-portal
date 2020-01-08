import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resolver.service';
import {SandboxInstanceTopologyRoutingModule} from './sandbox-instance-topology-routing.module';
import {Kypo2TopologyGraphModule} from 'kypo2-topology-graph';
import {environment} from '../../../../environments/environment';
import { SandboxInstanceTopologyComponent } from './sandbox-instance-topology.component';
import {MatCardModule} from '@angular/material/card';


/**
 * Module containing components and providers for sandbox instance topology page
 */
@NgModule({
  declarations: [SandboxInstanceTopologyComponent],
  imports: [
    CommonModule,
    SandboxInstanceTopologyRoutingModule,
    MatCardModule,
    Kypo2TopologyGraphModule.forRoot(environment.kypo2TopologyConfig)
  ],
  providers: [
    SandboxInstanceResolver,
  ]
})
export class SandboxInstanceTopologyModule { }
