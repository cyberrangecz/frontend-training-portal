import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingSummaryComponent } from './training-summary.component';
import {TrainingSummaryMaterialModule} from "./training-summary-material.module";
import {TrainingSummaryRoutingModule} from "./training-summary-routing.module";
import { TrainingInfoComponent } from './training-info/training-info.component';
import { TrainingSummaryTableComponent } from './training-summary-table/training-summary-table.component';
import {SharedModule} from "../../../shared/shared.module";
import {PipesModule} from '../../../../pipes/pipes.module';
import {ErrorHandlerService} from "../../../../services/error-handler.service";
import {TrainingRunFacadeModule} from '../../../../services/facades/modules/training-run-facade.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    TrainingSummaryMaterialModule,
    TrainingSummaryRoutingModule,
    TrainingRunFacadeModule
  ],
  declarations: [
  TrainingSummaryComponent,
  TrainingInfoComponent,
  TrainingSummaryTableComponent
  ],
  providers: [
    ErrorHandlerService
  ]
})

export class TrainingSummaryModule {}
