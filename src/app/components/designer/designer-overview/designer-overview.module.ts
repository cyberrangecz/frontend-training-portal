import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerOverviewRoutingModule} from "./designer-overview-routing.module";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {DesignerOverviewMaterialModule} from "./designer-overview-material.module";
import { TrainingDefinitionOverviewComponent } from './training-definition-overview/training-definition-overview.component';
import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview/sandbox-definition-overview.component';
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {SandboxDefinitionGetterService} from "../../../services/data-getters/sandbox-definition-getter.service";
import { UploadDialogComponent } from '../../shared/upload-dialog/upload-dialog.component';
import {TrainingDefinitionSetterService} from "../../../services/data-setters/training-definition-setter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {SandboxDefinitionSetterService} from "../../../services/data-setters/sandbox-definition-setter.service";
import {SharedModule} from "../../shared/shared.module";
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";
import {UploadService} from "../../../services/data-setters/upload.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DesignerOverviewRoutingModule,
    DesignerOverviewMaterialModule
  ],
  declarations: [
    DesignerOverviewComponent,
    TrainingDefinitionOverviewComponent,
    SandboxDefinitionOverviewComponent,
  ],
  providers: [
    UploadService,
    TrainingDefinitionGuard,
    TrainingDefinitionGetterService,
    TrainingDefinitionSetterService,
    TrainingInstanceGetterService,
    SandboxDefinitionGetterService,
    SandboxDefinitionSetterService,
  ],
  entryComponents: [
    UploadDialogComponent,
  ]
})

export class DesignerOverviewModule {

}
