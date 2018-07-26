import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CombinedViewComponent} from "./combined-view.component";

const routes: Routes = [
  {
    path: '',
    component: CombinedViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CombinedViewRoutingModule {

}
