import {BehaviorSubject} from 'rxjs';

export class UploadFileEvent {

  file: File;
  uploadInProgress: BehaviorSubject<boolean>;

  constructor(file: File, uploadInProgress: BehaviorSubject<boolean>) {
    this.file = file;
    this.uploadInProgress = uploadInProgress;
  }
}
