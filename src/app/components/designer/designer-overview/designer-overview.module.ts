import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerOverviewRoutingModule} from "./designer-overview-routing.module";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {DesignerOverviewMaterialModule} from "./designer-overview-material.module";
import { TrainingDefinitionOverviewComponent } from './training-definition-overview/training-definition-overview.component';
import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview/sandbox-definition-overview.component';
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import { DesignerAlertComponent } from './designer-alert/designer-alert.component';
import {DesignerAlertService} from "../../../services/event-services/designer-alert.service";
import {SandboxDefinitionGetterService} from "../../../services/data-getters/sandbox-definition-getter.service";
import { TrainingUploadDialogComponent } from './training-definition-overview/training-upload-dialog/training-upload-dialog.component';
import { SandboxUploadDialogComponent } from './sandbox-definition-overview/sandbox-upload-dialog/sandbox-upload-dialog.component';
import {TrainingDefinitionSetterService} from "../../../services/data-setters/training-definition-setter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {SandboxDefinitionSetterService} from "../../../services/data-setters/sandbox-definition-setter.service";

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
    TrainingDefinitionGetterService,
    TrainingDefinitionSetterService,
    TrainingInstanceGetterService,
    SandboxDefinitionGetterService,
    SandboxDefinitionSetterService,
    DesignerAlertService
  ],
  entryComponents: [
    TrainingUploadDialogComponent,
    SandboxUploadDialogComponent
  ]
})

export class DesignerOverviewModule {

}
