import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingSummaryComponent } from './training-summary.component';
import {TrainingSummaryMaterialModule} from "./training-summary-material.module";
import {TrainingSummaryRoutingModule} from "./training-summary-routing.module";
import { TrainingInfoComponent } from './training-info/training-info.component';
import { TrainingSummaryTableComponent } from './training-summary-table/training-summary-table.component';
import {TrainingRunGetterService} from "../../../../services/data-getters/training-run-getter.service";
import {SharedModule} from "../../../shared/shared.module";
import {TrainingRunSetterService} from "../../../../services/data-setters/training-run.setter.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrainingSummaryMaterialModule,
    TrainingSummaryRoutingModule
  ],
  declarations: [
  TrainingSummaryComponent,
  TrainingInfoComponent,
  TrainingSummaryTableComponent
  ],
  providers: [
    TrainingRunGetterService,
    TrainingRunSetterService
  ]
})

export class TrainingSummaryModule {}
