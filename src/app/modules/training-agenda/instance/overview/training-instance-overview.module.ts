import {NgModule} from '@angular/core';
import {SharedProvidersModule} from '../../shared-providers.module';
import {KypoTrainingApiConfig, KypoTrainingApiModule} from 'kypo-training-api';
import {TrainingInstanceOverviewRoutingModule} from './training-instance-overview-routing.module';
import {TrainingInstanceOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {KypoSandboxApiModule} from 'kypo-sandbox-api';
import {DynamicEnvironment} from '../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(DynamicEnvironment.getConfig().trainingApiConfig),
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig)
  ]
})
export class TrainingInstanceOverviewModule {

}
