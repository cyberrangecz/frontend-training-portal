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
  /**
   * True if distraction free mode is active, false otherwise
   */
  isActive$: Observable<boolean> = this.isActiveSubject.asObservable();

  /**
   * Enables or disables distraction free mode
   * @param value true to enable distraction free mode, false to disable
   */
  setDistractionFreeMode(value: boolean) {
    this.isActiveSubject.next(value);
  }

}
