import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DesignerOverviewComponent} from "./designer-overview.component";

const routes: Routes = [
  {
    path: '',
    component: DesignerOverviewComponent
  },
  {
    path: 'training',
    loadChildren: 'app/components/designer/training-definition/training-definition.module#TrainingDefinitionModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DesignerOverviewRoutingModule {

}
