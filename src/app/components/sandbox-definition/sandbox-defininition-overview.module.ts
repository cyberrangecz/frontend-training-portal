import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from '../../pipes/pipes.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SandboxDefinitionOverviewMaterialModule} from './sandbox-definition-overview-material.module';
import {SandboxDefinitionFacadeModule} from '../../services/facades/modules/sandbox-definition-facade.module';
import {AddSandboxDefinitionDialogComponent} from './sandbox-definition-overview/add-sandbox-definition-dialog/add-sandbox-definition-dialog.component';
import {AssociatedTrainingDefinitionsDialogComponent} from './sandbox-definition-overview/associated-training-definitions-dialog/associated-training-definitions-dialog.component';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview/sandbox-definition-overview.component';
import {TrainingDefinitionFacadeModule} from '../../services/facades/modules/training-definition-facade.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SandboxDefinitionOverviewRoutingModule,
    SandboxDefinitionOverviewMaterialModule,
    SandboxDefinitionFacadeModule,
    TrainingDefinitionFacadeModule,
    ReactiveFormsModule
  ],
  declarations: [
    SandboxDefinitionOverviewComponent,
    AssociatedTrainingDefinitionsDialogComponent,
    AddSandboxDefinitionDialogComponent
  ],
  providers: [

  ],
  entryComponents: [
    AssociatedTrainingDefinitionsDialogComponent,
    AddSandboxDefinitionDialogComponent,
  ]
})

export class SandboxDefininitionOverviewModule {

}
