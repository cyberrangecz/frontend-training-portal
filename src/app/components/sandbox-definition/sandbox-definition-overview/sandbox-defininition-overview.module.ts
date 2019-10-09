import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material';
import {PipesModule} from '../../../pipes/pipes.module';
import {SandboxDefinitionFacadeModule} from '../../../services/facades/modules/sandbox-definition-facade.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {AddSandboxDefinitionDialogComponent} from '../add-sandbox-definition-dialog/add-sandbox-definition-dialog.component';
import { SandboxDefinitionControlsComponent } from './sandbox-definition-controls/sandbox-definition-controls.component';
import {SandboxDefinitionOverviewMaterialModule} from './sandbox-definition-overview-material.module';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SandboxDefinitionOverviewComponent} from './sandbox-definition-overview.component';
import { SandboxDefinitionTableDetailComponent } from './sandbox-definition-table/sandbox-definition-table-detail/sandbox-definition-table-detail.component';
import { SandboxDefinitionTableComponent } from './sandbox-definition-table/sandbox-definition-table.component';

/**
 * Module containing components and routing for sandbox definition agenda
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    SandboxDefinitionOverviewRoutingModule,
    SandboxDefinitionOverviewMaterialModule,
    SandboxDefinitionFacadeModule,
    TrainingDefinitionFacadeModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  declarations: [
    SandboxDefinitionOverviewComponent,
    AddSandboxDefinitionDialogComponent,
    SandboxDefinitionControlsComponent,
    SandboxDefinitionTableComponent,
    SandboxDefinitionTableDetailComponent
  ],
  providers: [

  ],
  entryComponents: [
    AddSandboxDefinitionDialogComponent,
  ]
})

export class SandboxDefininitionOverviewModule {

}
