import {NgModule} from '@angular/core';
import {TrainingPreviewRoutingModule} from './training-preview-routing.module';
import {TrainingPreviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingPreviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingPreviewRoutingModule
  ]
})
export class TrainingPreviewModule {

}
