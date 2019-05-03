import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingDefinitionComponent} from "./training-definition.component";
import {TrainingDefinitionLeaveGuard} from "../../../services/guards/training-definition-leave-guard.service";
import {TrainingDefinitionAccessGuardService} from "../../../services/guards/training-definition-access-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionComponent,
    canActivate: [TrainingDefinitionAccessGuardService],
    canDeactivate: [TrainingDefinitionLeaveGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionRoutingModule {

}
