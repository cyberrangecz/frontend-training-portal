import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LevelConfigurationComponent} from "./level-configuration.component";

const routes: Routes = [
  {
    path: '',
    component: LevelConfigurationComponent,
    outlet: 'level'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LevelConfigurationRoutingModule {

}
