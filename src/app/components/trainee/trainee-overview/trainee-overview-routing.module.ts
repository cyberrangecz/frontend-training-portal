import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TraineeOverviewComponent} from "./trainee-overview.component";

const routes: Routes = [
  {
    path: '',
    component: TraineeOverviewComponent
  },
  {
    path: 'training/:id',
    loadChildren: 'app/components/trainee/training-run/training-run.module#TrainingRunModule',
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TraineeOverviewRoutingModule {

}
