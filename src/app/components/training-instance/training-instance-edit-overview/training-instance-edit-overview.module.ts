import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingInstanceCanDeactivate} from '../../../services/guards/training-instance-can-deactivate.service';
import {OrganizersAssignService} from '../../../services/training-instance/organizers-assign/organizers-assign.service';
import {TrainingInstanceEditConcreteService} from '../../../services/training-instance/edit/training-instance-edit-concrete.service';
import {TrainingInstanceEditService} from '../../../services/training-instance/edit/training-instance-edit.service';
import {SharedModule} from '../../shared/shared.module';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {TrainingDefinitionSelectorComponent} from './training-definition-selector/training-definition-selector.component';
import {TrainingInstanceEditOverviewMaterialModule} from './training-instance-edit-overview-material.module';
import {TrainingInstanceEditOverviewRoutingModule} from './training-instance-edit-overview-routing.module';
import { TrainingInstanceEditOverviewComponent } from './training-instance-edit-overview.component';
import { TrainingInstanceEditControlsComponent } from './training-instance-edit/training-instance-edit-controls/training-instance-edit-controls.component';
import {TrainingInstanceEditComponent} from './training-instance-edit/training-instance-edit.component';
import {Kypo2UserAssignModule, Kypo2UserAssignService} from 'kypo2-user-assign';
import { TrainingDefinitionListContentComponent } from './training-definition-selector/training-definition-list/training-definition-list-content.component';
import {TrainingDefinitionApi} from '../../../services/api/training-definition-api.service';
import {TrainingInstanceApi} from '../../../services/api/training-instance-api.service';
import {UserApi} from '../../../services/api/user-api.service';

/**
 * Main module of training instance edit components and providers
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Kypo2UserAssignModule,
    SharedModule,
    PipesModule,
    TrainingInstanceEditOverviewMaterialModule,
    TrainingInstanceEditOverviewRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    TrainingInstanceEditOverviewComponent,
    TrainingInstanceEditControlsComponent,
    TrainingInstanceEditComponent,
    TrainingDefinitionSelectorComponent,
    TrainingDefinitionListContentComponent],
  providers: [
    UserApi,
    TrainingInstanceApi,
    TrainingDefinitionApi,
    TrainingInstanceCanDeactivate,
    { provide: Kypo2UserAssignService, useClass: OrganizersAssignService },
    { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService }
  ],
  entryComponents: [
    TrainingDefinitionSelectorComponent,
    UnsavedChangesDialogComponent
  ]
})
export class TrainingInstanceEditOverviewModule {

}
