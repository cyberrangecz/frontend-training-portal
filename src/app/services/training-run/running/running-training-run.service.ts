import {BehaviorSubject} from 'rxjs';
import {Level} from '../../../model/level/level';
import {Observable} from 'rxjs/internal/Observable';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {skipWhile} from 'rxjs/operators';

export abstract class RunningTrainingRunService {

  sandboxInstanceId: number;
  trainingRunId: number;

  protected activeLevelSubject$: BehaviorSubject<Level> = new BehaviorSubject<Level>(undefined);
  activeLevel$: Observable<Level> = this.activeLevelSubject$.asObservable()
    .pipe(
      skipWhile(level => level === undefined || level === null)
    );

 abstract init(trainingRunInfo: AccessTrainingRunInfo);

 abstract getLevels(): Level[];

 abstract getActiveLevel(): Level;

 abstract getActiveLevelPosition(): number;

 abstract getStartTime(): Date;

 abstract getIsStepperDisplayed(): boolean;

 abstract next(): Observable<any>;

 abstract isLast(): boolean;

 abstract clear();
}
