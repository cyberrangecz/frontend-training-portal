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
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import { TrainingEditPopupComponent } from './training-instance-table/training-edit-popup/training-edit-popup.component';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {ActiveTrainingInstanceService} from "../../../services/organizer/active-training-instance.service";
import {SandboxInstanceFacadeModule} from "../../../services/facades/modules/sandbox-instance-facade.module";
import {SandboxInstancesSubtableComponent} from './training-instance-table/sandbox-instances-subtable/sandbox-instances-subtable.component';

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
    SandboxInstancesSubtableComponent
  ],
  providers: [
    ActiveTrainingInstanceService,
  ],
  entryComponents: [
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent,
    TrainingEditPopupComponent
  ]
})

export class OrganizerOverviewModule {

}
