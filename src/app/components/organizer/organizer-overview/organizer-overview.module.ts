import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganizerOverviewRoutingModule} from "./organizer-overview-routing.module";
import {OrganizerOverviewComponent} from "./organizer-overview.component";
import {TrainingInstanceGuard} from "../../../guards/training-instance-guard.service";
import { TrainingInstanceDefinitionComponent } from './training-instance-definition/training-instance-definition.component';
import { TrainingInstancesListComponent } from './training-instance-overview/training-instances-list.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {OrganizerOverviewMaterialModule} from "./organizer-overview-material.module";
import { OrganizersPickerComponent } from './training-instance-definition/organizers-picker/organizers-picker.component';
import { TrainingDefinitionPickerComponent } from './training-instance-definition/training-definition-picker/training-definition-picker.component';
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    OrganizerOverviewMaterialModule,
    OrganizerOverviewRoutingModule
  ],
  declarations: [
    OrganizerOverviewComponent,
    TrainingInstanceDefinitionComponent,
    TrainingInstancesListComponent,
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent
  ],
  providers: [
    TrainingInstanceGuard,
    TrainingDefinitionGetterService,
    TrainingInstanceGetterService
  ],
  entryComponents: [
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent
  ]
})

export class OrganizerOverviewModule {

}
