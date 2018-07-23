import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingDefinitionComponent} from "./training-definition.component";
import {LevelConfigurationComponent} from "./level-configuration/level-configuration.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionComponent,
    children: [
      {
        path: 'levels',
        children: [
          {
            path:':id',
            component: LevelConfigurationComponent,
            outlet: 'level'
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionRoutingModule {

}
