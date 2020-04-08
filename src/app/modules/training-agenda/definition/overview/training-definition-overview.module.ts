import {NgModule} from '@angular/core';
import {SharedProvidersModule} from '../../shared-providers.module';
import {KypoTrainingApiModule} from 'kypo-training-api';
import {TrainingDefinitionOverviewRoutingModule} from './training-definition-overview-routing.module';
import {TrainingDefinitionOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {environment} from '../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    TrainingDefinitionOverviewRoutingModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    TrainingDefinitionOverviewComponentsModule.forRoot(environment.trainingAgendaConfig)
  ]
})
export class TrainingDefinitionOverviewModule {

}
