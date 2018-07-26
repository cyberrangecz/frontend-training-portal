import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganizerRoutingModule} from "./organizer-routing.module";
import {OrganizerOverviewComponent} from "./organizer-overview.component";

@NgModule({
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ],
  declarations: [
    OrganizerOverviewComponent
  ],
  providers: [

  ]
})

export class OrganizerModule {

}
