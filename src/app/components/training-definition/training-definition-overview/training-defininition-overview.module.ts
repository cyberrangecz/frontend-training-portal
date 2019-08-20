import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrainingDefinitionTableComponent } from './training-definition-table/training-definition-table.component';
import { TrainingDefinitionUploadDialogComponent } from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {ngfModule} from 'angular-file';
import {FormsModule} from '@angular/forms';
import {StateChangeDialogComponent} from './state-change-dialog/state-change-dialog.component';
import { AuthorsListDialogComponent } from './authors-list-dialog/authors-list-dialog.component';
import { CloneDialogComponent } from './clone-dialog/clone-dialog.component';
import {TrainingDefinitionOverviewRoutingModule} from './training-definition-overview-routing.module';
import {TrainingDefinitionOverviewMaterialModule} from './training-definition-overview-material.module';
import {TrainingDefinitionOverviewComponent} from './training-definition-overview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ngfModule,
    PipesModule,
    TrainingDefinitionOverviewRoutingModule,
    TrainingDefinitionOverviewMaterialModule,
    TrainingDefinitionFacadeModule,
    TrainingInstanceFacadeModule,
  ],
  declarations: [
    TrainingDefinitionOverviewComponent,
    TrainingDefinitionUploadDialogComponent,
    TrainingDefinitionTableComponent,
    StateChangeDialogComponent,
    AuthorsListDialogComponent,
    CloneDialogComponent,
  ],
  providers: [
  ],
  entryComponents: [
    TrainingDefinitionUploadDialogComponent,
    StateChangeDialogComponent,
    AuthorsListDialogComponent,
    CloneDialogComponent
  ]
})

export class TrainingDefininitionOverviewModule {

}
