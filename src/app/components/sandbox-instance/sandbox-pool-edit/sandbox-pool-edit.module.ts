import {NgModule} from '@angular/core';
import {SandboxPoolEditComponent} from './sandbox-pool-edit.component';
import {SandboxPoolEditMaterialModule} from './sandbox-pool-edit-material.module';
import {CommonModule} from '@angular/common';
import {SandboxPoolEditRoutingModule} from './sandbox-pool-edit-routing.module';
import {KypoControlsModule} from 'kypo-controls';
import {SandboxDefinitionSelectComponent} from './sandbox-definition-select/sandbox-definition-select.component';
import {PoolEditService} from '../../../services/sandbox-instance/pool/pool-edit.service';
import {PoolEditConcreteService} from '../../../services/sandbox-instance/pool/pool-edit-concrete.service';
import {ReactiveFormsModule} from '@angular/forms';
import {SandboxDefinitionApi} from '../../../services/api/sandbox-definition-api.service';
import {SandboxInstanceApi} from '../../../services/api/sandbox-instance-api.service';
import {KypoListModule} from 'kypo-list';

@NgModule({
  declarations: [
    SandboxPoolEditComponent,
    SandboxDefinitionSelectComponent
  ],
  imports: [
    CommonModule,
    SandboxPoolEditMaterialModule,
    SandboxPoolEditRoutingModule,
    KypoControlsModule,
    KypoListModule,
    ReactiveFormsModule,

  ],
  providers: [
    SandboxDefinitionApi,
    SandboxInstanceApi,
    { provide: PoolEditService, useClass: PoolEditConcreteService },
  ]
})
export class SandboxPoolEditModule {
}
