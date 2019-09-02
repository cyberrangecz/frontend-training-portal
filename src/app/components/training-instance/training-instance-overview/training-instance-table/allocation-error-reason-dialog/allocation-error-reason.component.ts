import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SandboxInstance} from '../../../../../model/sandbox/sandbox-instance';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-allocation-failed-reason',
  templateUrl: './allocation-error-reason.component.html',
  styleUrls: ['./allocation-error-reason.component.css']
})
/**
 * Displays detail of sandbox instance allocation error.
 */
export class AllocationErrorReasonComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AllocationErrorReasonComponent>,
              @Inject(MAT_DIALOG_DATA) public sandbox: SandboxInstance) {
    super();
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
