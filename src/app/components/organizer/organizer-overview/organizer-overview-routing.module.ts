import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrganizerOverviewComponent} from "./organizer-overview.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizerOverviewComponent
  },
  {
    path: 'training/:id',
    loadChildren: 'app/components/organizer/training-instance-overview/training-instance-overview.module#TrainingInstanceOverviewModule',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrganizerOverviewRoutingModule {

}
