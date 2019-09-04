import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {TrainingInstance} from '../../model/training/training-instance';
import {now} from 'moment';

/**
 * Service holding active training instance for sub component of organizers training overview
 */
@Injectable()
export class ActiveTrainingInstanceService {

  private _activeInstance: TrainingInstance;

  private _onActiveTrainingChangedSubject: Subject<number> = new Subject<number>();
  /**
   * Observable of active training instances changes
   * @type {Observable<number>}
   */
  onActiveTrainingChanged: Observable<number> = this._onActiveTrainingChangedSubject.asObservable();

  get(): TrainingInstance {
    return this._activeInstance;
  }

  /**
   * Sets active training instance
   * @param {TrainingInstance} training instance to be set as active
   */
  setActiveTrainingInstance(training: TrainingInstance) {
    this._activeInstance = training;
    this._onActiveTrainingChangedSubject.next(training.id);
  }

  hasStarted(): boolean {
    return this._activeInstance && now() > this._activeInstance.startTime.valueOf();
  }
}
