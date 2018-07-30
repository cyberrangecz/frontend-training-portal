import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingRunComponent} from "./training-run.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TrainingRunComponent,
        children: [
          {
            path: 'level/:order',
            loadChildren: 'app/components/trainee/training-run/training-run-level/training-run-level.module#TrainingRunLevelModule',
            outlet: 'training-run'
          },
          {
            path: 'results',
            loadChildren: 'app/components/trainee/training-run/training-run-results/training-run-results.module#TrainingRunResultsModule',
            outlet: 'training-run'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunRoutingModule {

}
