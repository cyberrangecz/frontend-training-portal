import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganizerRoutingModule} from "./organizer-routing.module";
import {OrganizerOverviewComponent} from "./organizer-overview/organizer-overview.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    SharedModule
  ],
  declarations: [
    OrganizerOverviewComponent
  ],
  providers: [

  ]
})

export class OrganizerModule {

}
