import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {DesignerAlertMessageEnum} from "../../../../../enums/designer-alert-message.enum";

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
      type: DesignerAlertMessageEnum.Info,
      message: 'File upload was canceled.'
    };
    this.dialogRef.close(result);
    // this.dialogRef.close(null);
  }

  upload() {
    // TODO: upload file and return result
    const result = {
      type: DesignerAlertMessageEnum.Success,
      message: 'Training was succesfully uploaded.'
    };
    this.dialogRef.close(result)
  }

  chooseFile() {
    // TODO: choose file
  }
}
