import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingProgressViewComponent} from "./training-progress-view.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingProgressViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingProgressViewRoutingModule {

}
