import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxInstanceDetailRoutingModule } from './sandbox-instance-detail-routing.module';
import { SandboxInstanceDetailComponent } from './sandbox-instance-detail.component';
import {SandboxInstanceDetailMaterialModule} from './sandbox-instance-detail-material.module';

@NgModule({
  declarations: [SandboxInstanceDetailComponent],
  imports: [
    CommonModule,
    SandboxInstanceDetailRoutingModule,
    SandboxInstanceDetailMaterialModule
  ]
})
export class SandboxInstanceDetailModule { }
