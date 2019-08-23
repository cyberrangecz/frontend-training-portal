import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingRunResultsComponent} from "./training-run-results.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingRunResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunResultsRoutingModule {

}
