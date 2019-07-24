import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganizerOverviewRoutingModule} from "./organizer-overview-routing.module";
import {OrganizerOverviewComponent} from "./organizer-overview.component";
import { TrainingInstanceEditComponent } from './training-instance-edit/training-instance-edit.component';
import { TrainingInstancesTableComponent } from './training-instance-table/training-instances-table.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {OrganizerOverviewMaterialModule} from "./organizer-overview-material.module";
import { OrganizersPickerComponent } from './training-instance-edit/organizers-picker/organizers-picker.component';
import { TrainingDefinitionPickerComponent } from './training-instance-edit/training-definition-picker/training-definition-picker.component';
import { TrainingEditPopupComponent } from './training-instance-table/training-edit-popup/training-edit-popup.component';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {ActiveTrainingInstanceService} from "../../../services/organizer/active-training-instance.service";
import {SandboxInstanceFacadeModule} from "../../../services/facades/modules/sandbox-instance-facade.module";
import {SandboxInstancesSubtableComponent} from './training-instance-table/sandbox-instances-subtable/sandbox-instances-subtable.component';
import { AllocationErrorDialogComponent } from './training-instance-table/allocation-error-dialog/allocation-error-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@busacca/ng-pick-datetime'
import {SandboxAllocationService} from '../../../services/organizer/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceObservablesPoolService} from '../../../services/organizer/sandbox-allocation/sandbox-instance-observables-pool.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PipesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OrganizerOverviewMaterialModule,
    OrganizerOverviewRoutingModule,
    TrainingDefinitionFacadeModule,
    TrainingInstanceFacadeModule,
    SandboxInstanceFacadeModule

  ],
  declarations: [
    OrganizerOverviewComponent,
    TrainingInstanceEditComponent,
    TrainingInstancesTableComponent,
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent,
    TrainingEditPopupComponent,
    SandboxInstancesSubtableComponent,
    AllocationErrorDialogComponent
  ],
  providers: [
    ActiveTrainingInstanceService,
    SandboxInstanceObservablesPoolService,
    SandboxAllocationService,
  ],
  entryComponents: [
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent,
    TrainingEditPopupComponent,
    AllocationErrorDialogComponent
  ]
})

export class OrganizerOverviewModule {

}
