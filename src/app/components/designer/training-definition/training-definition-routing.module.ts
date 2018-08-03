import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingDefinitionComponent} from "./training-definition.component";
import {TrainingDefinitionGuard} from "../../../guards/training-definition-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionComponent,
    canDeactivate: [TrainingDefinitionGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionRoutingModule {

}
