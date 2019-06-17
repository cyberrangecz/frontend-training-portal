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
    loadChildren: () => import('app/components/organizer/training-instance-overview/training-instance-overview.module').then(m => m.TrainingInstanceOverviewModule),
  },
  {
    path: 'training/:id/access-token',
    loadChildren: () => import('app/components/organizer/access-token-detail/access-token-detail.module').then(m => m.AccessTokenDetailModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrganizerOverviewRoutingModule {

}
