import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerRoutingModule} from "./designer-routing.module";
import {DesignerOverviewComponent} from "./designer-overview/designer-overview.component";
import {DesignerMaterialModule} from "./designer-material.module";
import { TrainingDefinitionComponent } from './training-definition/training-definition.component';
import { SandboxDefinitionComponent } from './sandbox-definition/sandbox-definition.component';
import {TrainingDefinitionLoaderService} from "../../services/data-loaders/training-definition-loader.service";
import { DesignerAlertComponent } from './designer-overview/designer-alert/designer-alert.component';
import {DesignerAlertService} from "../../services/event-services/designer-alert.service";
import {SandboxDefinitionLoaderService} from "../../services/data-loaders/sandbox-definition-loader.service";

@NgModule({
  imports: [
    CommonModule,
    DesignerRoutingModule,
    DesignerMaterialModule
  ],
  declarations: [
    DesignerOverviewComponent,
    TrainingDefinitionComponent,
    SandboxDefinitionComponent,
    DesignerAlertComponent
  ],
  providers: [
    TrainingDefinitionLoaderService,
    SandboxDefinitionLoaderService,
    DesignerAlertService
  ]
})

export class DesignerModule {

}
