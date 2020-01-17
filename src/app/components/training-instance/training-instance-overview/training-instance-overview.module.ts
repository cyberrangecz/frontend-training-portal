import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {SharedModule} from '../../shared/shared.module';
import { TrainingInstanceControlsComponent } from './training-instance-controls/training-instance-controls.component';
import {TrainingInstanceOverviewMaterialModule} from './training-instance-overview-material.module';
import {TrainingInstanceOverviewRoutingModule} from './training-instance-overview-routing.module';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {TrainingInstanceOverviewConcreteService} from '../../../services/training-instance/training-instance-overview-concrete.service';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxInstanceApi} from '../../../services/api/sandbox-instance-api.service';
import {TrainingInstanceApi} from '../../../services/api/training-instance-api.service';

/**
 * Main module of training instance agenda. Contains components and providers for displaying table of training instance
 * and CRUD operations on them. It contains routing to more feature modules (detail atc.)
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Kypo2TableModule,
    TrainingInstanceOverviewMaterialModule,
    TrainingInstanceOverviewRoutingModule,
  ],
  declarations: [
    TrainingInstanceOverviewComponent,
    TrainingInstanceControlsComponent
  ],
  providers: [
    TrainingInstanceApi,
    SandboxInstanceApi,
    TrainingInstanceResolver,
    TrainingInstanceBreadcrumbResolver,
    { provide: TrainingInstanceOverviewService, useClass: TrainingInstanceOverviewConcreteService }
  ]
})

export class TrainingInstanceOverviewModule {

}
