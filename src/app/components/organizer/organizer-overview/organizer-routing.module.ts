import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrganizerOverviewComponent} from "./organizer-overview.component";
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";

const routes: Routes = [
  {
    path: '',
    component: OrganizerOverviewComponent
  },
  {
    path: 'training/:id',
    loadChildren: 'app/components/organizer/training-instance/training-instance.module#TrainingInstanceModule',
    canActivate: [TrainingDefinitionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrganizerRoutingModule {

}
