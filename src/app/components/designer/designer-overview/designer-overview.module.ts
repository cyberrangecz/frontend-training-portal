import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DesignerOverviewRoutingModule} from "./designer-overview-routing.module";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {DesignerOverviewMaterialModule} from "./designer-overview-material.module";
import { TrainingDefinitionOverviewComponent } from './training-definition-overview/training-definition-overview.component';
import { SandboxDefinitionOverviewComponent } from './sandbox-definition-overview/sandbox-definition-overview.component';
import { TrainingDefinitionUploadDialogComponent } from './training-definition-overview/training-definition-upload-dialog/training-definition-upload-dialog.component';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {PipesModule} from "../../../pipes/pipes.module";
import {ngfModule} from "angular-file";
import {SandboxDefinitionFacadeModule} from "../../../services/facades/modules/sandbox-definition-facade.module";
import { AssociatedTrainingDefinitionsDialogComponent } from './sandbox-definition-overview/associated-training-definitions-dialog/associated-training-definitions-dialog.component';
import {FormsModule} from '@angular/forms';
import {StateChangeDialogComponent} from './training-definition-overview/state-change-dialog/state-change-dialog.component';
import { AuthorsListDialogComponent } from './training-definition-overview/authors-list-dialog/authors-list-dialog.component';
import { CloneDialogComponent } from './training-definition-overview/clone-dialog/clone-dialog.component';
import { AddSandboxDefinitionDialogComponent } from './sandbox-definition-overview/add-sandbox-definition-dialog/add-sandbox-definition-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ngfModule,
    PipesModule,
    DesignerOverviewRoutingModule,
    DesignerOverviewMaterialModule,
    TrainingDefinitionFacadeModule,
    TrainingInstanceFacadeModule,
    SandboxDefinitionFacadeModule
  ],
  declarations: [
    DesignerOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    TrainingDefinitionOverviewComponent,
    SandboxDefinitionOverviewComponent,
    AssociatedTrainingDefinitionsDialogComponent,
    StateChangeDialogComponent,
    AuthorsListDialogComponent,
    CloneDialogComponent,
    AddSandboxDefinitionDialogComponent
  ],
  providers: [
  ],
  entryComponents: [
    TrainingDefinitionUploadDialogComponent,
    AssociatedTrainingDefinitionsDialogComponent,
    AddSandboxDefinitionDialogComponent,
    StateChangeDialogComponent,
    AuthorsListDialogComponent,
    CloneDialogComponent
  ]
})

export class DesignerOverviewModule {

}
