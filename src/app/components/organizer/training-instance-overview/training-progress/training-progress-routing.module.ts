import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingProgressComponent} from "./training-progress.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingProgressComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingProgressRoutingModule {

}
