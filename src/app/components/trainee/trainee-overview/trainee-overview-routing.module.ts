import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TraineeOverviewComponent} from "./trainee-overview.component";

const routes: Routes = [
  {
    path: '',
    component: TraineeOverviewComponent
  },
  {
    path: 'training',
    loadChildren: 'app/components/trainee/training-run/training-run.module#TrainingRunModule',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TraineeOverviewRoutingModule {

}
