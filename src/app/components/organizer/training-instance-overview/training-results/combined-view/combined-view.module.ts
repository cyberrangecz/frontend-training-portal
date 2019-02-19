import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CombinedViewComponent } from './combined-view.component';
import {CombinedViewMaterialModule} from "./combined-view-material.module";
import {CombinedViewRoutingModule} from "./combined-view-routing.module";
import { Kypo2TrainingsVisualizationOverviewLibModule } from "kypo2-trainings-visualization-overview-lib";

@NgModule({
  imports: [
    CommonModule,
    CombinedViewMaterialModule,
    CombinedViewRoutingModule,
    Kypo2TrainingsVisualizationOverviewLibModule
  ],
  declarations: [
  CombinedViewComponent
  ],
  providers: [
  ]
})

export class CombinedViewModule {

}
