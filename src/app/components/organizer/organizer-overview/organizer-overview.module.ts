import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganizerOverviewRoutingModule} from "./organizer-overview-routing.module";
import {OrganizerOverviewComponent} from "./organizer-overview.component";
import {TrainingInstanceGuard} from "../../../guards/training-instance-guard.service";

@NgModule({
  imports: [
    CommonModule,
    OrganizerOverviewRoutingModule
  ],
  declarations: [
    OrganizerOverviewComponent
  ],
  providers: [
    TrainingInstanceGuard
  ]
})

export class OrganizerOverviewModule {

}
