import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BaseComponent} from '../../base.component';
import { SandboxDefinitionFormGroup } from './add-sandbox-definition-dialog-form-group';
import {SandboxDefinitionInfo} from './sandbox-definition-info';

@Component({
  selector: 'kypo2-add-sandbox-definition-dialog',
  templateUrl: './add-sandbox-definition-dialog.component.html',
  styleUrls: ['./add-sandbox-definition-dialog.component.scss']
})
/**
 * Displays form for creating new sandbox definition in modal
 */
export class AddSandboxDefinitionDialogComponent extends BaseComponent implements OnInit {

  sandboxDefinitionFormGroup: SandboxDefinitionFormGroup;

  constructor(public dialogRef: MatDialogRef<AddSandboxDefinitionDialogComponent>) {
    super();
  }

  ngOnInit() {
    this.sandboxDefinitionFormGroup = new SandboxDefinitionFormGroup();
  }

  get gitlabUrl() {return this.sandboxDefinitionFormGroup.formGroup.get('gitlabUrl'); }
  get revision() {return this.sandboxDefinitionFormGroup.formGroup.get('revision'); }

  /**
   * Opens dialog for creating new sandbox definition
   */
  add() {
    if (this.sandboxDefinitionFormGroup.formGroup.valid) {
      this.dialogRef.close({type: 'confirm', data: new SandboxDefinitionInfo(this.gitlabUrl.value, this.revision.value)});
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
