import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SandboxInstanceResourceDetailRoutingModule} from './sandbox-instance-resource-detail-routing.module';
import {SandboxInstanceResourceDetailMaterialModule} from './sandbox-instance-resource-detail-material.module';
import {SandboxInstanceResourceResolver} from '../../../services/resolvers/sandbox-instance-resolvers/sandbox-instance-resource-resolver.service';
import { SandboxInstanceResourceDetailComponent } from './sandbox-instance-resource-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SandboxInstanceResourceDetailRoutingModule,
    SandboxInstanceResourceDetailMaterialModule,
  ],
  declarations: [
    SandboxInstanceResourceDetailComponent
  ],
  providers: [
    SandboxInstanceResourceResolver
  ]
})
export class SandboxInstanceResourceDetailModule {

}
