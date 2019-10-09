import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';

@Injectable()
/**
 * Service to hide toolbar and sidebar in certain parts of app
 */
export class DistractionFreeModeService {

  private isActiveSubject: Subject<boolean> = new BehaviorSubject(false);
  isActive$: Observable<boolean> = this.isActiveSubject.asObservable();

  setDistractionFreeMode(value: boolean) {
    this.isActiveSubject.next(value);
  }

}
