import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DesignerOverviewComponent} from "./designer-overview.component";
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";

const routes: Routes = [
  {
    path: '',
    component: DesignerOverviewComponent
  },
  {
    path: 'training',
    loadChildren: 'app/components/designer/training-definition/training-definition.module#TrainingDefinitionModule',
    canActivate: [TrainingDefinitionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DesignerOverviewRoutingModule {

}
