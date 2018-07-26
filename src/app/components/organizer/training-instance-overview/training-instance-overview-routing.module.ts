import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TrainingInstanceOverviewComponent} from "./training-instance-overview.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent
  },
  {
    path: 'summary',
    loadChildren: 'app/components/organizer/training-instance-overview/training-summary/training-summary.module#TrainingSummaryModule',
    outlet: 'overview'
  },
  {
    path: 'progress',
    loadChildren: 'app/components/organizer/training-instance-overview/training-progress/training-progress.module#TrainingProgressModule',
    outlet: 'overview'
  },
  {
    path: 'results',
    loadChildren: 'app/components/organizer/training-instance-overview/training-results/training-results.module#TrainingResultsModule',
    outlet: 'overview'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInstanceOverviewRoutingModule {

}
