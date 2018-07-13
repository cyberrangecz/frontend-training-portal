import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrganizerOverviewComponent} from "./organizer-overview/organizer-overview.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizerOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrganizerRoutingModule {

}
