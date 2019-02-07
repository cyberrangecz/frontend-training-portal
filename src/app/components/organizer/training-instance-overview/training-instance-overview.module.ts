import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';
import {TrainingInstanceOverviewRoutingModule} from "./training-instance-overview-routing.module";
import {TrainingInstanceOverviewMaterialModule} from "./training-instance-overview-material.module";
import {ActiveTrainingInstanceService} from "../../../services/active-training-instance.service";
import {TrainingInstanceSandboxAllocationService} from "../../../services/training-instance-sandbox-allocation.service";
import {SandboxInstanceFacade} from "../../../services/facades/sandbox-instance-facade.service";

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewMaterialModule
  ],
  declarations: [
  TrainingInstanceOverviewComponent
  ],
  providers: [
    ActiveTrainingInstanceService,
    TrainingInstanceSandboxAllocationService,
    SandboxInstanceFacade
  ]
})

export class TrainingInstanceOverviewModule {

}
