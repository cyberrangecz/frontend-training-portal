import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
import {environment} from '../../../../../../environments/environment';
import {ProgressViewMaterialModule} from './progress-view-material.module';
import {ProgressViewRoutingModule} from './progress-view-routing.module';
import { ProgressViewComponent } from './progress-view.component';

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
