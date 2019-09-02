import {Injectable} from '@angular/core';
import {AbstractLevel} from '../../model/level/abstract-level';
import {Observable, Subject} from 'rxjs';

@Injectable()
/**
 * Emits event each time, level is updated
 */
export class LevelEditService {

  private _onLevelUpdatedSubject: Subject<AbstractLevel> = new Subject();
  onLevelUpdated: Observable<AbstractLevel> = this._onLevelUpdatedSubject.asObservable();

  public emitLevelUpdated(level: AbstractLevel) {
    this._onLevelUpdatedSubject.next(level);
  }
}
