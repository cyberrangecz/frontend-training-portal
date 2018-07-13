import {RouterModule, Routes} from "@angular/router";
import {PortalComponent} from "./portal.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: PortalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalRoutingModule {

}
