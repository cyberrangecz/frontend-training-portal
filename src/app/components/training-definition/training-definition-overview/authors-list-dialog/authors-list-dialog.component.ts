import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'app-authors-list-dialog',
  templateUrl: './authors-list-dialog.component.html',
  styleUrls: ['./authors-list-dialog.component.css']
})
export class AuthorsListDialogComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthorsListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {

  }

}
