import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CombinedViewComponent } from './combined-view.component';
import {CombinedViewMaterialModule} from "./combined-view-material.module";
import {CombinedViewRoutingModule} from "./combined-view-routing.module";
import { Kypo2TrainingsVisualizationOverviewLibModule } from "kypo2-trainings-visualization-overview-lib";
import {Kypo2TrainingsHurdlingVizLibModule} from "kypo2-trainings-hurdling-viz-lib";
import {VisualizationOverviewConfig} from "../../../../../model/config/visualization-overview-config";
import {VisualizationHurdlingConfig} from '../../../../../model/config/visualization-hurdling-config';

@NgModule({
  imports: [
    CommonModule,
    CombinedViewMaterialModule,
    CombinedViewRoutingModule,
    Kypo2TrainingsVisualizationOverviewLibModule.forRoot(VisualizationOverviewConfig),
    Kypo2TrainingsHurdlingVizLibModule.forRoot(VisualizationHurdlingConfig)
  ],
  declarations: [
  CombinedViewComponent
  ],
  providers: [
  ]
})

export class CombinedViewModule {

}
