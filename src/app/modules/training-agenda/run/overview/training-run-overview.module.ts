import {NgModule} from '@angular/core';
import {KypoTrainingApiModule} from 'kypo-training-api';
import {SharedProvidersModule} from '../../shared-providers.module';
import {TrainingRunOverviewRoutingModule} from './training-run-overview-routing.module';
import {TrainingRunOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {DynamicEnvironment} from '../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    TrainingRunOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingRunOverviewRoutingModule
  ]
})
export class TrainingRunOverviewModule {

}
