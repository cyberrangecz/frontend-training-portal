import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TrainingInstanceOverviewComponent} from "./training-instance-overview.component";
import {TrainingInstanceGuard} from "../../../guards/training-instance-guard.service";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'overview',
        component: TrainingInstanceOverviewComponent,
        children: [
          {
            path: 'summary',
            loadChildren: 'app/components/organizer/training-instance-overview/training-summary/training-summary.module#TrainingSummaryModule',
            outlet: 'display'
          },
          {
            path: 'progress',
            loadChildren: 'app/components/organizer/training-instance-overview/training-progress/training-progress.module#TrainingProgressModule',
            outlet: 'display'
          },
          {
            path: 'results',
            loadChildren: 'app/components/organizer/training-instance-overview/training-results/training-results.module#TrainingResultsModule',
            outlet: 'display'
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
export class TrainingInstanceOverviewRoutingModule {

}
