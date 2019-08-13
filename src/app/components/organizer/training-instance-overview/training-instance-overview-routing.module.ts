import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TrainingInstanceOverviewComponent} from "./training-instance-overview.component";
import {TrainingInstanceGuardService} from "../../../services/guards/training-instance-guard.service";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'detail',
  },
  {
    path: 'detail',
    canActivate: [TrainingInstanceGuardService],
    component: TrainingInstanceOverviewComponent,
    children: [
      {
        path: 'summary',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-summary/training-summary.module').then(m => m.TrainingSummaryModule),
        outlet: 'tab'
      },
      {
        path: 'progress',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-progress/training-progress.module').then(m => m.TrainingProgressModule),
        outlet: 'tab'
      },
      {
        path: 'results',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-results/training-results.module').then(m => m.TrainingResultsModule),
        outlet: 'tab'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'summary',
        outlet: 'tab'
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
