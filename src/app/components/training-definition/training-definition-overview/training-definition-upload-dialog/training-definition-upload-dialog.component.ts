import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { AlertTypeEnum } from '../../../../model/enums/alert-type.enum';
import { TrainingDefinitionFacade } from '../../../../services/facades/training-definition-facade.service';
import { BaseComponent } from '../../../base.component';
import { BehaviorSubject } from 'rxjs';
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
  uploadInProgress;

  onUploadLoading = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<TrainingDefinitionUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.uploadInProgress = new BehaviorSubject<boolean>(false);
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
    if (this.data.type == 'training') {
      this.uploadInProgress.next(true);
      this.onUploadLoading.emit({
        type: 'confirm',
        file: this.selectedFile,
        uploadInProgress: this.uploadInProgress
      });
    }
  }

  /**
   * Removes selected file
   */
  clearFile() {
    this.selectedFile = null;
  }
}
