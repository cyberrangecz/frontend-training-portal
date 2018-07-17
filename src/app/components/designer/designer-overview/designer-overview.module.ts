import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerOverviewRoutingModule} from "./designer-overview-routing.module";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {DesignerOverviewMaterialModule} from "./designer-overview-material.module";
import { TrainingDefinitionOverviewComponent } from './training-definition-overview/training-definition-overview.component';
import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview/sandbox-definition-overview.component';
import {TrainingDefinitionLoaderService} from "../../../services/data-loaders/training-definition-loader.service";
import { DesignerAlertComponent } from './designer-alert/designer-alert.component';
import {DesignerAlertService} from "../../../services/event-services/designer-alert.service";
import {SandboxDefinitionLoaderService} from "../../../services/data-loaders/sandbox-definition-loader.service";
import { TrainingUploadDialogComponent } from './training-definition-overview/training-upload-dialog/training-upload-dialog.component';
import { SandboxUploadDialogComponent } from './sandbox-definition-overview/sandbox-upload-dialog/sandbox-upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DesignerOverviewRoutingModule,
    DesignerOverviewMaterialModule
  ],
  declarations: [
    DesignerOverviewComponent,
    TrainingDefinitionOverviewComponent,
    SandboxDefinitionOverviewComponent,
    DesignerAlertComponent,
    TrainingUploadDialogComponent,
    SandboxUploadDialogComponent
  ],
  providers: [
    TrainingDefinitionLoaderService,
    SandboxDefinitionLoaderService,
    DesignerAlertService
  ],
  entryComponents: [
    TrainingUploadDialogComponent,
    SandboxUploadDialogComponent
  ]
})

export class DesignerOverviewModule {

}
