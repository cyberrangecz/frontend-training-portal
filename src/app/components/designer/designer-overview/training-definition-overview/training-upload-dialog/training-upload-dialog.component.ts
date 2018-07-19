import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";

@Component({
  selector: 'designer-training-upload-dialog',
  templateUrl: './training-upload-dialog.component.html',
  styleUrls: ['./training-upload-dialog.component.css']
})
export class TrainingUploadDialogComponent implements OnInit {

  uploadedFile;

  constructor(public dialogRef: MatDialogRef<TrainingUploadDialogComponent>){

  }

  ngOnInit() {
  }

  cancel() {
    // Only for testing purposes, return null in production
    const result = {
      type: AlertTypeEnum.Info,
      message: 'File upload was canceled.'
    };
    this.dialogRef.close(result);
    // this.dialogRef.close(null);
  }

  upload() {
    // TODO: upload file and return result
    const result = {
      type: AlertTypeEnum.Success,
      message: 'Training was succesfully uploaded.'
    };
    this.dialogRef.close(result)
  }

  chooseFile() {
    // TODO: choose file
  }
}
