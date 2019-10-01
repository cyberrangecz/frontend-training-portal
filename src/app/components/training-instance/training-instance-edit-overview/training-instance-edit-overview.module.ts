import {NgModule} from '@angular/core';
import { TrainingInstanceEditOverviewComponent } from './training-instance-edit-overview/training-instance-edit-overview.component';
import { TrainingInstanceEditControlsComponent } from './training-instance-edit/training-instance-edit-controls/training-instance-edit-controls.component';
import {CommonModule} from '@angular/common';
import {TrainingInstanceEditOverviewMaterialModule} from './training-instance-edit-overview-material.module';
import {TrainingInstanceEditOverviewRoutingModule} from './training-instance-edit-overview-routing.module';
import {TrainingInstanceEditComponent} from './training-instance-edit/training-instance-edit.component';
import {TrainingDefinitionPickerComponent} from './training-definition-picker/training-definition-picker.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from '@busacca/ng-pick-datetime';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {UserFacadeModule} from '../../../services/facades/modules/user-facade.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingInstanceEditService} from '../../../services/training-instance/training-instance-edit.service';
import {TrainingInstanceEditConcreteService} from '../../../services/training-instance/training-instance-edit-concrete.service';
import {UsersAssignModule} from '../../shared/user-assign/users-assign.module';
import {UserAssignService} from '../../../services/shared/user-assign.service';
import {OrganizersAssignService} from '../../../services/training-instance/organizers-assign.service';
import {TrainingInstanceLeaveGuardService} from '../../../services/guards/training-instance-leave-guard.service';
import {UnsavedChangesDialogComponent} from '../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserFacadeModule,
    UsersAssignModule,
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
    { provide: UserAssignService, useClass: OrganizersAssignService },
    { provide: TrainingInstanceEditService, useClass: TrainingInstanceEditConcreteService }
  ],
  entryComponents: [
    TrainingDefinitionPickerComponent,
    UnsavedChangesDialogComponent
  ]
})
export class TrainingInstanceEditOverviewModule {

}
