import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BaseComponent} from '../../../../base.component';
import {AllocationModalFormGroup} from './allocation-modal-form-group';

@Component({
  selector: 'kypo2-allocation-modal',
  templateUrl: './allocation-modal.component.html',
  styleUrls: ['./allocation-modal.component.css']
})
/**
 * Modal dialog to set how many sandbox instance from available pool should be allocated.
 */
export class AllocationModalComponent extends BaseComponent implements OnInit {

  allocationSizeForm: AllocationModalFormGroup;
  get allocationSize() { return this.allocationSizeForm.formGroup.get('allocationSize'); }

  constructor(public dialogRef: MatDialogRef<AllocationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number) {
    super();
  }


  ngOnInit() {
    this.allocationSizeForm = new AllocationModalFormGroup(this.data);
    this.allocationSize.setValue(1);
  }

  confirm() {
    this.dialogRef.close({
      type: 'confirm',
      payload: this.allocationSize.value
    });
  }

  allocateAll() {
    this.dialogRef.close({
      type: 'confirm',
      payload: this.data
    });
  }
}
