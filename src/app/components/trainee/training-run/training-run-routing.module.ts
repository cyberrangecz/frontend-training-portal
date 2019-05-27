import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingRunComponent} from "./training-run.component";
import {TrainingRunLevelsGuard} from "../../../services/guards/training-run-levels-guard.service";
const routes: Routes = [
  {
    path: '',
    component: TrainingRunComponent,
    canActivate: [TrainingRunLevelsGuard],
    canDeactivate: [TrainingRunLevelsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunRoutingModule {

}
