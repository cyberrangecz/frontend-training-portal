import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs';

@Injectable()
/**
 * Service to hide toolbar and sidebar in certain parts of the webapp
 */
export class DistractionFreeModeService {

  private isActiveSubject: Subject<boolean> = new BehaviorSubject(false);
  isActive: Observable<boolean> = this.isActiveSubject.asObservable();

  setDistractionFreeMode(value: boolean) {
    this.isActiveSubject.next(value);
  }

}
