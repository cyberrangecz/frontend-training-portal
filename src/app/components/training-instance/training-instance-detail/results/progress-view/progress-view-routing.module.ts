import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProgressViewComponent} from "./progress-view.component";

const routes: Routes = [
  {
    path: '',
    component: ProgressViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProgressViewRoutingModule {

}
