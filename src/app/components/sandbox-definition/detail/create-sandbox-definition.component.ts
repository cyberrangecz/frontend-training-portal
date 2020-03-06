import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {SandboxDefinitionFormGroup} from './create-sandbox-definition-form-group';
import {SandboxDefinitionCreateInfo} from '../../../model/sandbox/definition/sandbox-definition-create-info';
import {takeWhile} from 'rxjs/operators';
import {SandboxDefinitionDetailService} from '../../../services/sandbox-definition/detail/sandbox-definition-detail.service';
import {SandboxDefinitionDetailControls} from './sandbox-definition-detail-controls';
import {KypoControlItem} from 'kypo-controls';

/**
 * Component with form for creating new sandbox definition
 */
@Component({
  selector: 'kypo2-create-sandbox-definition',
  templateUrl: './create-sandbox-definition.component.html',
  styleUrls: ['./create-sandbox-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSandboxDefinitionComponent extends BaseComponent implements OnInit {

  sandboxDefinitionFormGroup: SandboxDefinitionFormGroup;
  controls: KypoControlItem[];

  constructor(private sandboxDefinitionService: SandboxDefinitionDetailService) {
    super();
  }

  ngOnInit() {
    this.controls = SandboxDefinitionDetailControls.create();
    this.sandboxDefinitionFormGroup = new SandboxDefinitionFormGroup();
  }

  get gitlabUrl() {return this.sandboxDefinitionFormGroup.formGroup.get('gitlabUrl'); }

  get revision() {return this.sandboxDefinitionFormGroup.formGroup.get('revision'); }


  onControlsAction(control: KypoControlItem) {
    if (control.id === SandboxDefinitionDetailControls.CREATE_ACTION_ID) {
      this.sandboxDefinitionService.create(new SandboxDefinitionCreateInfo(this.gitlabUrl.value, this.revision.value))
        .pipe(
          takeWhile(_ => this.isAlive)
        )
        .subscribe();
    }
  }
}
