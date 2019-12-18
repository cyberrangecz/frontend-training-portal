import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class FileUploadProgressService {

  private isInProgressSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isInProgress$: Observable<boolean> = this.isInProgressSubject$.asObservable();

  start() {
    this.isInProgressSubject$.next(true);
  }

  finish() {
    this.isInProgressSubject$.next(false);
  }

}
