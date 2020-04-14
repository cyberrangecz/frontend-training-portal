import {NgModule} from '@angular/core';
import {SharedProvidersModule} from '../../shared-providers.module';
import {KypoTrainingApiModule} from 'kypo-training-api';
import {TrainingDefinitionOverviewRoutingModule} from './training-definition-overview-routing.module';
import {TrainingDefinitionOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig)
  ]
})
export class TrainingDefinitionOverviewModule {

}
