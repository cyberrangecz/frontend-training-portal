import {NgModule} from '@angular/core';
import {TrainingPreviewRoutingModule} from './training-preview-routing.module';
import {TrainingPreviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingPreviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingPreviewRoutingModule
  ]
})
export class TrainingPreviewModule {

}
