import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganizerOverviewRoutingModule} from "./organizer-overview-routing.module";
import {OrganizerOverviewComponent} from "./organizer-overview.component";
import {TrainingInstanceGuard} from "../../../guards/training-instance-guard.service";
import { TrainingInstanceEditComponent } from './training-instance-edit/training-instance-edit.component';
import { TrainingInstancesListComponent } from './training-instance-overview/training-instances-list.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {OrganizerOverviewMaterialModule} from "./organizer-overview-material.module";
import { OrganizersPickerComponent } from './training-instance-edit/organizers-picker/organizers-picker.component';
import { TrainingDefinitionPickerComponent } from './training-instance-edit/training-definition-picker/training-definition-picker.component';
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import { TrainingEditPopupComponent } from './training-instance-overview/training-edit-popup/training-edit-popup.component';
import { TrainingDeleteDialogComponent } from './training-instance-overview/training-delete-dialog/training-delete-dialog.component';
import {TrainingInstanceSetterService} from "../../../services/data-setters/training-instance-setter.service";
import {TrainingInstanceMapperService} from "../../../services/data-mappers/training-instance-mapper.service";
import {TrainingDefinitionMapperService} from "../../../services/data-mappers/training-definition-mapper.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OrganizerOverviewMaterialModule,
    OrganizerOverviewRoutingModule,

  ],
  declarations: [
    OrganizerOverviewComponent,
    TrainingInstanceEditComponent,
    TrainingInstancesListComponent,
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent,
    TrainingEditPopupComponent,
    TrainingDeleteDialogComponent
  ],
  providers: [
    TrainingInstanceGuard,
    TrainingDefinitionGetterService,
    TrainingDefinitionMapperService,
    TrainingInstanceGetterService,
    TrainingInstanceSetterService,
    TrainingInstanceMapperService
  ],
  entryComponents: [
    OrganizersPickerComponent,
    TrainingDefinitionPickerComponent,
    TrainingDeleteDialogComponent,
    TrainingEditPopupComponent
  ]
})

export class OrganizerOverviewModule {

}
