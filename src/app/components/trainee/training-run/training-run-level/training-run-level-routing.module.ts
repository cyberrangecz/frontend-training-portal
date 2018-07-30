import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TrainingRunLevelComponent} from "./training-run-level.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingRunLevelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunLevelRoutingModule {

}
