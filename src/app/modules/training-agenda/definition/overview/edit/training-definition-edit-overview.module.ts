import {NgModule} from '@angular/core';
import {TrainingDefinitionEditOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {TrainingDefinitionEditOverviewRoutingModule} from './training-definition-edit-overview-routing.module';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionEditOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionEditOverviewRoutingModule
  ]
})
export class TrainingDefinitionEditOverviewModule {

}
