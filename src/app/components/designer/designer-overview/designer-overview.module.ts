import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerOverviewRoutingModule} from "./designer-overview-routing.module";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {DesignerOverviewMaterialModule} from "./designer-overview-material.module";
import { TrainingDefinitionOverviewComponent } from './training-definition-overview/training-definition-overview.component';
import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview/sandbox-definition-overview.component';
import {SandboxDefinitionFacade} from "../../../services/facades/sandbox-definition-facade.service";
import { DesignerUploadDialogComponent } from '../upload-dialog/designer-upload-dialog.component';
import {SharedModule} from "../../shared/shared.module";
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {PipesModule} from "../../../pipes/pipes.module";
import {ngfModule} from "angular-file";

@NgModule({
  imports: [
    CommonModule,
    ngfModule,
    SharedModule,
    PipesModule,
    DesignerOverviewRoutingModule,
    DesignerOverviewMaterialModule,
    TrainingDefinitionFacadeModule,
    TrainingInstanceFacadeModule
  ],
  declarations: [
    DesignerOverviewComponent,
    DesignerUploadDialogComponent,
    TrainingDefinitionOverviewComponent,
    SandboxDefinitionOverviewComponent,
  ],
  providers: [
    TrainingDefinitionGuard,
    SandboxDefinitionFacade,
  ],
  entryComponents: [
    DesignerUploadDialogComponent,
  ]
})

export class DesignerOverviewModule {

}
