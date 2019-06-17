import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DesignerOverviewComponent} from "./designer-overview.component";

const routes: Routes = [
  {
    path: '',
    component: DesignerOverviewComponent
  },
  {
    path: 'training/new',
    loadChildren: () => import('app/components/designer/training-definition/training-definition.module').then(m => m.TrainingDefinitionModule),
  },
  {
    path: 'training/:id',
    loadChildren: () => import('app/components/designer/training-definition/training-definition.module').then(m => m.TrainingDefinitionModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DesignerOverviewRoutingModule {

}
