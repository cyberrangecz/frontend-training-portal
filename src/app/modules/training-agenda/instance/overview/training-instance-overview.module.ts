import {NgModule} from '@angular/core';
import {SharedProvidersModule} from '../../shared-providers.module';
import {KypoTrainingApiModule} from 'kypo-training-api';
import {TrainingInstanceOverviewRoutingModule} from './training-instance-overview-routing.module';
import {TrainingInstanceOverviewComponentsModule} from 'kypo-training-agenda';
import {CommonModule} from '@angular/common';
import {KypoSandboxApiModule} from 'kypo-sandbox-api';
import {environment} from '../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    SharedProvidersModule,
    KypoTrainingApiModule.forRoot(environment.trainingApiConfig),
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewComponentsModule.forRoot(environment.trainingAgendaConfig)
  ],
})
export class TrainingInstanceOverviewModule {

}
