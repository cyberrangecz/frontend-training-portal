import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

/**
 * Reports on state of a file upload
 */
@Injectable()
export class FileUploadProgressService {

  private isInProgressSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * True if file upload is in progress, false otherwise
   */
  isInProgress$: Observable<boolean> = this.isInProgressSubject$.asObservable();

  /**
   * Starts file upload
   */
  start() {
    this.isInProgressSubject$.next(true);
  }

  /**
   * Finishes file upload
   */
  finish() {
    this.isInProgressSubject$.next(false);
  }

}
