import {NgModule} from '@angular/core';
import {TrainingDefinitionEditOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {TrainingDefinitionEditOverviewRoutingModule} from './training-definition-edit-overview-routing.module';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionEditOverviewComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingDefinitionEditOverviewRoutingModule
  ]
})
export class TrainingDefinitionEditOverviewModule {

}
