import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ScoreDevelopmentViewComponent} from "./score-development-view.component";

const routes: Routes = [
  {
    path: '',
    component: ScoreDevelopmentViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScoreDevelopmentViewRoutingModule {

}
