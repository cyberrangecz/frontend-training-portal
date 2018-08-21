import {Component, Inject, OnInit} from '@angular/core';
import {RevealHintDialogComponent} from "../reveal-hint-dialog/reveal-hint-dialog.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-reveal-solution-dialog',
  templateUrl: './reveal-solution-dialog.component.html',
  styleUrls: ['./reveal-solution-dialog.component.css']
})
export class RevealSolutionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RevealHintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {

  }

  confirm() {
    this.dialogRef.close({
      type: 'confirm'
    })
  }

  cancel() {
    this.dialogRef.close();
  }

}
