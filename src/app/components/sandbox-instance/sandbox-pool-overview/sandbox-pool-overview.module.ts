import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxPoolOverviewRoutingModule } from './sandbox-pool-overview-routing.module';
import {SandboxPoolOverviewMaterialModule} from './sandbox-pool-overview-material.module';
import {SandboxPoolOverviewComponent} from "./sandbox-pool-overview.component";

@NgModule({
  declarations: [SandboxPoolOverviewComponent],
  imports: [
    CommonModule,
    SandboxPoolOverviewRoutingModule,
    SandboxPoolOverviewMaterialModule
  ]
})
export class SandboxPoolOverviewModuleModule { }
