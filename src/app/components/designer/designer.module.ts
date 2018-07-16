import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerRoutingModule} from "./designer-routing.module";
import {DesignerOverviewComponent} from "./designer-overview/designer-overview.component";
import {DesignerMaterialModule} from "./designer-material.module";
import {SharedModule} from "../shared/shared.module";
import { TrainingDefinitionComponent } from './training-definition/training-definition.component';
import { SandboxDefinitionComponent } from './sandbox-definition/sandbox-definition.component';

@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule,
    DesignerMaterialModule,
    SharedModule
  ],
  declarations: [
    DesignerOverviewComponent,
    TrainingDefinitionComponent,
    SandboxDefinitionComponent
  ],
  providers: [

  ]
})

export class DesignerModule {

}
