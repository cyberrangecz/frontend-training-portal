import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DesignerOverviewComponent} from "./designer-overview.component";

const routes: Routes = [
  {
    path: '',
    component: DesignerOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DesignerOverviewRoutingModule {

}
