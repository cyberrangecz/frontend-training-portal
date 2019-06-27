import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SandboxInstance} from "../../../../../model/sandbox/sandbox-instance";

@Component({
  selector: 'app-allocation-failed-reason',
  templateUrl: './allocation-error-dialog.component.html',
  styleUrls: ['./allocation-error-dialog.component.css']
})
export class AllocationErrorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AllocationErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sandbox: SandboxInstance
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
