import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KypoPipesModule} from 'kypo-common';
import {TrainingDefinitionCanDeactivate} from '../../../services/guards/training-definition-can-deactivate.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {AuthorsAssignService} from '../../../services/training-definition/authors-assign/authors-assign.service';
import {TrainingDefinitionEditService} from '../../../services/training-definition/edit/training-definition-edit.service';
import {SharedModule} from '../../shared/shared.module';
import {LevelOverviewModule} from './levels-edit/level-overview.module';
import {TrainingDefinitionEditOverviewMaterialModule} from './training-definition-edit-overview-material.module';
import {TrainingDefinitionEditOverviewRoutingModule} from './training-definition-edit-overview-routing.module';
import {TrainingDefinitionEditOverviewComponent} from './training-definition-edit-overview.component';
import {SandboxDefinitionPickerComponent} from './training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import {TrainingDefinitionEditComponent} from './training-definition-edit/training-definition-edit.component';
import {Kypo2UserAssignModule, Kypo2UserAssignService} from 'kypo2-user-assign';
import {SandboxDefinitionApi} from '../../../services/api/sandbox-definition-api.service';
import {KypoControlsModule} from 'kypo-controls';

/**
 * Module containing components and providers of training definition detail/edt/new actions.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        Kypo2UserAssignModule,
        TrainingDefinitionEditOverviewRoutingModule,
        TrainingDefinitionEditOverviewMaterialModule,
        LevelOverviewModule,
        KypoPipesModule,
        ReactiveFormsModule,
        KypoControlsModule,
    ],
  declarations: [
    TrainingDefinitionEditOverviewComponent,
    TrainingDefinitionEditComponent,
    SandboxDefinitionPickerComponent,
  ],
  providers: [
    SandboxDefinitionApi,
    TrainingDefinitionEditService,
    TrainingDefinitionCanDeactivate,
    TrainingDefinitionResolver,
    TrainingDefinitionBreadcrumbResolver,
    {provide: Kypo2UserAssignService, useClass: AuthorsAssignService},
  ]
})

export class TrainingDefinitionEditOverviewModule {
}
