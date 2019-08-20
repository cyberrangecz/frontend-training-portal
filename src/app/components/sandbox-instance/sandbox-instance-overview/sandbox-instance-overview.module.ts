import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SandboxInstanceOverviewRoutingModule} from './sandbox-instance-overview-routing.module';
import {SandboxInstanceOverviewMaterialModule} from './sandbox-instance-overview-material.module';
import { SandboxInstanceOverviewComponent } from './sandbox-instance-overview.component';

@NgModule({
  declarations: [SandboxInstanceOverviewComponent],
  imports: [
    CommonModule,
    SandboxInstanceOverviewRoutingModule,
    SandboxInstanceOverviewMaterialModule
  ]
})
export class SandboxInstanceOverviewModule { }
