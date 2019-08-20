import {Component, Inject, OnInit} from '@angular/core';
import {RevealHintDialogComponent} from "../reveal-hint-dialog/reveal-hint-dialog.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-submit-flag-dialog',
  templateUrl: './wrong-flag-dialog.component.html',
  styleUrls: ['./wrong-flag-dialog.component.css']
})
export class WrongFlagDialogComponent implements OnInit {

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
