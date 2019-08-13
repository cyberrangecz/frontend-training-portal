import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingSummaryComponent } from './training-summary.component';
import {TrainingSummaryMaterialModule} from "./training-summary-material.module";
import {TrainingSummaryRoutingModule} from "./training-summary-routing.module";
import { TrainingInfoComponent } from './training-info/training-info.component';
import { ActiveTrainingRunsOverviewComponent } from './active-training-runs-overview/active-training-runs-overview.component';
import {PipesModule} from '../../../../pipes/pipes.module';
import {ErrorHandlerService} from "../../../../services/shared/error-handler.service";
import {TrainingRunFacadeModule} from '../../../../services/facades/modules/training-run-facade.module';
import { ArchivedTrainingRunsOverviewComponent } from './archived-training-runs-overview/archived-training-runs-overview.component';
import {SandboxInstanceFacadeModule} from "../../../../services/facades/modules/sandbox-instance-facade.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    TrainingSummaryMaterialModule,
    TrainingSummaryRoutingModule,
    TrainingRunFacadeModule,
    SandboxInstanceFacadeModule
  ],
  declarations: [
  TrainingSummaryComponent,
  TrainingInfoComponent,
  ActiveTrainingRunsOverviewComponent,
  ArchivedTrainingRunsOverviewComponent
  ],
  providers: [
    ErrorHandlerService
  ]
})

export class TrainingSummaryModule {}
