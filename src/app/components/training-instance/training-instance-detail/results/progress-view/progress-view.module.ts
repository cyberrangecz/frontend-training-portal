import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ProgressViewComponent } from './progress-view.component';
import {ProgressViewRoutingModule} from "./progress-view-routing.module";
import {ProgressViewMaterialModule} from "./progress-view-material.module";
import {Kypo2TrainingsHurdlingVizLibModule} from "kypo2-trainings-hurdling-viz-lib";
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    ProgressViewRoutingModule,
    ProgressViewMaterialModule,
    Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: environment.trainingRestBasePath})
  ],
  declarations: [
  ProgressViewComponent
  ],
  providers: [
  ]
})

export class ProgressViewModule {

}
