import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-authors-list-dialog',
  templateUrl: './authors-list-dialog.component.html',
  styleUrls: ['./authors-list-dialog.component.css']
})
export class AuthorsListDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthorsListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {

  }

}
