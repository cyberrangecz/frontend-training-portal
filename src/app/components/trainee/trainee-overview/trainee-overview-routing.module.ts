import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TraineeOverviewComponent} from "./trainee-overview.component";
import {TrainingRunGuard} from "../../../guards/training-run-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TraineeOverviewComponent
  },
  {
    path: 'training/:id',
    loadChildren: 'app/components/trainee/training-run/training-run.module#TrainingRunModule',
    canActivate: [TrainingRunGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TraineeOverviewRoutingModule {

}
