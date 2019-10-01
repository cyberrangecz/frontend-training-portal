import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingInstanceOverviewRoutingModule} from './training-instance-overview-routing.module';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import { TrainingInstanceEditComponent } from '../training-instance-edit-overview/training-instance-edit/training-instance-edit.component';
import { TrainingInstanceTableComponent } from './training-instance-table/training-instance-table.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrainingInstanceOverviewMaterialModule} from './training-instance-overview-material.module';
import { TrainingDefinitionPickerComponent } from '../training-instance-edit-overview/training-definition-picker/training-definition-picker.component';
import {PipesModule} from '../../../pipes/pipes.module';
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingInstanceFacadeModule} from '../../../services/facades/modules/training-instance-facade.module';
import {ActiveTrainingInstanceService} from '../../../services/training-instance/active-training-instance.service';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {SandboxInstancesTableComponent} from './training-instance-table/sandbox-instance-table/sandbox-instances-table.component';
import { AllocationErrorReasonComponent } from './training-instance-table/allocation-error-reason-dialog/allocation-error-reason.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@busacca/ng-pick-datetime';
import {SandboxAllocationService} from '../../../services/training-instance/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceObservablesPoolService} from '../../../services/training-instance/sandbox-allocation/sandbox-instance-observables-pool.service';
import { AllocationModalComponent } from './training-instance-table/allocation-modal/allocation-modal.component';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import { TrainingInstanceControlsComponent } from './training-instance-controls/training-instance-controls.component';

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
    TrainingInstanceFacadeModule,
    SandboxInstanceFacadeModule,
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
    ActiveTrainingInstanceService,
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
