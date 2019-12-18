import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../base.component';
import {Observable} from 'rxjs';
import {FileUploadProgressService} from '../../../../services/shared/file-upload-progress.service';
import {tap} from 'rxjs/operators';
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
  uploadInProgress$: Observable<boolean>;

  onUpload = new EventEmitter<File>();

  constructor(public dialogRef: MatDialogRef<TrainingDefinitionUploadDialogComponent>,
    private uploadProgressService: FileUploadProgressService,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
    this.uploadInProgress$ = this.uploadProgressService.isInProgress$;
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
    this.onUpload.emit(this.selectedFile);
  }

  /**
   * Removes selected file
   */
  clearFile() {
    this.selectedFile = null;
  }
}
