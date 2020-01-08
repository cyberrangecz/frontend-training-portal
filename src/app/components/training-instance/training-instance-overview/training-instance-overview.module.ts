import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {SandboxInstanceApiModule} from '../../../services/api/modules/sandbox-instance-api.module';
import {TrainingInstanceApiModule} from '../../../services/api/modules/training-instance-api.module';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {SandboxAllocationService} from '../../../services/training-instance/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceObservablesPoolService} from '../../../services/training-instance/sandbox-allocation/sandbox-instance-observables-pool.service';
import {SharedModule} from '../../shared/shared.module';
import { TrainingInstanceControlsComponent } from './training-instance-controls/training-instance-controls.component';
import {TrainingInstanceOverviewMaterialModule} from './training-instance-overview-material.module';
import {TrainingInstanceOverviewRoutingModule} from './training-instance-overview-routing.module';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import { AllocationErrorReasonComponent } from './training-instance-table/allocation-error-reason-dialog/allocation-error-reason.component';
import { AllocationModalComponent } from './training-instance-table/allocation-modal/allocation-modal.component';
import {SandboxInstancesTableComponent} from './training-instance-table/sandbox-instance-table/sandbox-instances-table.component';
import { TrainingInstanceTableComponent } from './training-instance-table/training-instance-table.component';

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
    PipesModule,
    TrainingInstanceOverviewMaterialModule,
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceApiModule,
    SandboxInstanceApiModule,
  ],
  declarations: [
    TrainingInstanceOverviewComponent,
    TrainingInstanceTableComponent,
    SandboxInstancesTableComponent,
    AllocationErrorReasonComponent,
    AllocationModalComponent,
    TrainingInstanceControlsComponent
  ],
  providers: [
    SandboxInstanceObservablesPoolService,
    SandboxAllocationService,
    TrainingInstanceResolver,
    TrainingInstanceBreadcrumbResolver
  ],
  entryComponents: [
    AllocationModalComponent,
    AllocationErrorReasonComponent
  ]
})

export class TrainingInstanceOverviewModule {

}
