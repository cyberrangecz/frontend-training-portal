import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerOverviewRoutingModule} from "./designer-overview-routing.module";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {DesignerOverviewMaterialModule} from "./designer-overview-material.module";
import { TrainingDefinitionOverviewComponent } from './training-definition-overview/training-definition-overview.component';
import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview/sandbox-definition-overview.component';
import {TrainingDefinitionFacade} from "../../../services/facades/training-definition-facade.service";
import {SandboxDefinitionFacade} from "../../../services/facades/sandbox-definition-facade.service";
import { UploadDialogComponent } from '../../shared/upload-dialog/upload-dialog.component';
import {TrainingInstanceFacade} from "../../../services/facades/training-instance-facade.service";
import {SharedModule} from "../../shared/shared.module";
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";
import {UploadService} from "../../../services/upload.service";
import {TrainingDefinitionMapper} from "../../../services/mappers/training-definition-mapper.service";
import {TrainingInstanceMapper} from "../../../services/mappers/training-instance-mapper.service";
import {LevelMapper} from "../../../services/mappers/level-mapper.service";
import {TrainingRunMapper} from "../../../services/mappers/training-run-mapper.service";

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
    TrainingDefinitionFacade,
    TrainingDefinitionFacade,
    TrainingDefinitionMapper,
    TrainingInstanceFacade,
    TrainingInstanceMapper,
    TrainingRunMapper,
    SandboxDefinitionFacade,
    LevelMapper
  ],
  entryComponents: [
    UploadDialogComponent,
  ]
})

export class DesignerOverviewModule {

}
