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
    loadChildren: () => import('app/components/trainee/training-run/training-run.module').then(m => m.TrainingRunModule),
  },
  {
    path: 'training/:id/results',
    loadChildren: () => import('app/components/trainee/training-run/training-run-results/training-run-results.module').then(m => m.TrainingRunResultsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TraineeOverviewRoutingModule {

}
