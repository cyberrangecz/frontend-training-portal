import { Component, OnInit } from '@angular/core';
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-sandbox-upload-dialog',
  templateUrl: './sandbox-upload-dialog.component.html',
  styleUrls: ['./sandbox-upload-dialog.component.css']
})
/**
 * Component of sandbox definition upload dialog window
 */
export class SandboxUploadDialogComponent implements OnInit {

  uploadedFile;

  constructor(public dialogRef: MatDialogRef<SandboxUploadDialogComponent>) {

  }

  ngOnInit() {
  }

  /**
   * Cancels the upload and closes the dialog window
   */
  cancel() {
    // Only for testing purposes, return null in production
    const result = {
      type: AlertTypeEnum.Info,
      message: 'File upload was canceled.'
    };
    this.dialogRef.close(result);
    // this.dialogRef.close(null);
  }

  /**
   * Uploads chosen file to a server and displays result of the upload
   */
  upload() {
    // TODO: upload file and return result
    const result = {
      type: AlertTypeEnum.Success,
      message: 'Sandbox was succesfully uploaded.'
    };
    this.dialogRef.close(result)
  }

  /**
   * Enables user to choose the file which should be uploaded
   */
  chooseFile() {
    // TODO: choose file
  }

}
