import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingDefinitionComponent} from "./training-definition.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionComponent,
  },
  {
    path: 'level',
    loadChildren: 'app/components/designer/training-definition/level-configuration/level-configuration.module#LevelConfigurationModule',
    outlet: 'level'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionRoutingModule {

}
