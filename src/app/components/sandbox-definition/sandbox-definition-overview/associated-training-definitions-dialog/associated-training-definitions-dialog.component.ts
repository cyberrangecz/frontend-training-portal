import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {BaseComponent} from "../../../base.component";
@Component({
  selector: 'app-associated-training-definitions-dialog',
  templateUrl: './associated-training-definitions-dialog.component.html',
  styleUrls: ['./associated-training-definitions-dialog.component.css']
})
export class AssociatedTrainingDefinitionsDialogComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AssociatedTrainingDefinitionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
  }

}
