import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TraineeOverviewComponent} from "./trainee-overview.component";

const routes: Routes = [
  {
    path: '',
    component: TraineeOverviewComponent
  },
  {
    path: 'training/game',
    loadChildren: 'app/components/trainee/training-run/training-run.module#TrainingRunModule',
  },
  {
    path: 'training/:id/results',
    loadChildren: 'app/components/trainee/training-run/training-run-results/training-run-results.module#TrainingRunResultsModule',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TraineeOverviewRoutingModule {

}
