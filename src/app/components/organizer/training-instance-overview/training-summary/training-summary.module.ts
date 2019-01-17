import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingSummaryComponent } from './training-summary.component';
import {TrainingSummaryMaterialModule} from "./training-summary-material.module";
import {TrainingSummaryRoutingModule} from "./training-summary-routing.module";
import { TrainingInfoComponent } from './training-info/training-info.component';
import { TrainingSummaryTableComponent } from './training-summary-table/training-summary-table.component';
import {TrainingRunFacade} from "../../../../services/facades/training-run-facade.service";
import {SharedModule} from "../../../shared/shared.module";
import {TrainingRunMapper} from '../../../../services/mappers/training-run-mapper.service';
import {PipesModule} from '../../../../pipes/pipes.module';
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PipesModule.forRoot(),
    TrainingSummaryMaterialModule,
    TrainingSummaryRoutingModule
  ],
  declarations: [
  TrainingSummaryComponent,
  TrainingInfoComponent,
  TrainingSummaryTableComponent
  ],
  providers: [
    TrainingRunFacade,
    TrainingRunMapper,
    ComponentErrorHandlerService
  ]
})

export class TrainingSummaryModule {}
