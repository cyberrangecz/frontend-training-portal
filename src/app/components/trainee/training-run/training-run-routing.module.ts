import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingRunComponent} from "./training-run.component";

const routes: Routes = [
  {
    path: 'level/:order',
    component: TrainingRunComponent
  },
  {
    path: 'results',
    loadChildren: 'app/components/trainee/training-run/training-run-results/training-run-results.module#TrainingRunResultsModule',
  },
  {
    path: '',
    redirectTo: 'level/1',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunRoutingModule {

}
