import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../base.component';
import { BehaviorSubject } from 'rxjs';
import {UploadFileEvent} from '../../../../model/events/upload-file-event';
@Component({
  selector: 'kypo2-training-upload-dialog',
  templateUrl: './training-definition-upload-dialog.component.html',
  styleUrls: ['./training-definition-upload-dialog.component.css']
})
/**
 * Component of training definition upload dialog window
 */
export class TrainingDefinitionUploadDialogComponent extends BaseComponent
  implements OnInit {
  selectedFile: File;
  uploadInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  onUpload = new EventEmitter<UploadFileEvent>();

  constructor(public dialogRef: MatDialogRef<TrainingDefinitionUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
  }

  /**
   * Cancels the upload and closes the dialog window
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Uploads chosen file to a server and displays result of the upload
   */
  upload() {
    this.uploadInProgress$.next(true);
    this.onUpload.emit(new UploadFileEvent(
      this.selectedFile,
      this.uploadInProgress$
    ));
  }

  /**
   * Removes selected file
   */
  clearFile() {
    this.selectedFile = null;
  }
}
