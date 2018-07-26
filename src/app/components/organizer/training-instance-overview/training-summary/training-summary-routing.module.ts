import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingSummaryComponent} from "./training-summary.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingSummaryComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingSummaryRoutingModule {

}
