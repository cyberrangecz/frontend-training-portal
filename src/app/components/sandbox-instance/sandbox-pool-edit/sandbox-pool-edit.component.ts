import {Component, OnInit} from '@angular/core';
import {SandboxPoolFormGroup} from './sandbox-pool-form-group';
import {KypoBaseComponent} from 'kypo-common';
import {KypoControlItem} from 'kypo-controls';
import {PoolEditService} from '../../../services/sandbox-instance/pool/pool-edit.service';
import {take, takeWhile} from 'rxjs/operators';
import {defer, of} from 'rxjs';

/**
 * Component with form for creating pool
 */
@Component({
  selector: 'kypo2-sandbox-pool-create',
  templateUrl: './sandbox-pool-edit.component.html',
  styleUrls: ['./sandbox-pool-edit.component.css'],
})
export class SandboxPoolEditComponent extends KypoBaseComponent implements OnInit {

  poolFormGroup: SandboxPoolFormGroup;
  controls: KypoControlItem[];

  constructor(private poolEditService: PoolEditService) {
    super()
  }

  ngOnInit(): void {
    this.poolFormGroup = new SandboxPoolFormGroup();
    this.initControls();
    this.poolFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.initControls());
  }

  get sandboxDefinition() {return this.poolFormGroup.formGroup.get('sandboxDefinition'); }

  get poolSize() {return this.poolFormGroup.formGroup.get('poolSize'); }

  onControlsAction(control: KypoControlItem) {
    control.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  selectSandboxDefinition() {
    this.poolEditService.selectDefinition(this.sandboxDefinition.value)
      .pipe(
        take(1)
      ).subscribe(result => {
        if (result) {
          this.poolFormGroup.formGroup.markAsDirty();
          this.sandboxDefinition.setValue(result);
        }
    });
  }

  initControls() {
    this.controls = [
      new KypoControlItem(
        'create',
        'Create',
        'primary',
        of(!this.poolFormGroup.formGroup.valid),
        defer(() => this.poolEditService.create(this.poolFormGroup.createPoolFromValues()))
      )
    ]
  }
}
