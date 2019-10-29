import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {UserFacadeModule} from '../../../services/facades/modules/user-facade.module';
import {TrainingInstanceLeaveGuardService} from '../../../services/guards/training-instance-leave-guard.service';
import {OrganizersAssignService} from '../../../services/training-instance/organizers-assign/organizers-assign.service';
import {TrainingInstanceEditConcreteService} from '../../../services/training-instance/training-instance-edit-concrete.service';
import {TrainingInstanceEditService} from '../../../services/training-instance/training-instance-edit.service';
import {SharedModule} from '../../shared/shared.module';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {TrainingDefinitionPickerComponent} from './training-definition-picker/training-definition-picker.component';
import {TrainingInstanceEditOverviewMaterialModule} from './training-instance-edit-overview-material.module';
import {TrainingInstanceEditOverviewRoutingModule} from './training-instance-edit-overview-routing.module';
import { TrainingInstanceEditOverviewComponent } from './training-instance-edit-overview.component';
import { TrainingInstanceEditControlsComponent } from './training-instance-edit/training-instance-edit-controls/training-instance-edit-controls.component';
import {TrainingInstanceEditComponent} from './training-instance-edit/training-instance-edit.component';
import {Kypo2UserAssignModule, Kypo2UserAssignService} from 'kypo2-user-assign';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserFacadeModule,
    Kypo2UserAssignModule,
    SharedModule,
    PipesModule,
    TrainingInstanceEditOverviewMaterialModule,
    TrainingInstanceEditOverviewRoutingModule,
    TrainingInstanceFacadeModule,
    TrainingDefinitionFacadeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [
    TrainingInstanceEditOverviewComponent,
    TrainingInstanceEditControlsComponent,
    TrainingInstanceEditComponent,
    TrainingDefinitionPickerComponent],
  providers: [
    TrainingInstanceLeaveGuardService,
    { provide: Kypo2UserAssignService, useClass: OrganizersAssignService },
    { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService }
  ],
  entryComponents: [
    TrainingDefinitionPickerComponent,
    UnsavedChangesDialogComponent
  ]
})
export class TrainingInstanceEditOverviewModule {

}
