import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {SandboxInstanceResolver} from '../../../services/resolvers/sandbox-instance-resolver.service';
import {SandboxInstanceDetailMaterialModule} from './sandbox-instance-detail-material.module';
import { SandboxInstanceDetailRoutingModule } from './sandbox-instance-detail-routing.module';
import { SandboxInstanceDetailComponent } from './sandbox-instance-detail.component';

@NgModule({
  declarations: [SandboxInstanceDetailComponent],
  imports: [
    CommonModule,
    SandboxInstanceDetailRoutingModule,
    SandboxInstanceDetailMaterialModule
  ],
  providers: [
    SandboxInstanceResolver
  ]
})
export class SandboxInstanceDetailModule { }
