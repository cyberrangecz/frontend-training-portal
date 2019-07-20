import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CombinedViewComponent } from './combined-view.component';
import {CombinedViewMaterialModule} from "./combined-view-material.module";
import {CombinedViewRoutingModule} from "./combined-view-routing.module";
import { Kypo2TrainingsVisualizationOverviewLibModule } from "kypo2-trainings-visualization-overview-lib";
import {Kypo2TrainingsHurdlingVizLibModule} from "kypo2-trainings-hurdling-viz-lib";
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    CombinedViewMaterialModule,
    CombinedViewRoutingModule,
    Kypo2TrainingsVisualizationOverviewLibModule.forRoot({kypo2TrainingsVisualizationRestBasePath: environment.trainingRestBasePath}),
    Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: environment.trainingRestBasePath})
  ],
  declarations: [
  CombinedViewComponent
  ],
  providers: [
  ]
})

export class CombinedViewModule {

}
