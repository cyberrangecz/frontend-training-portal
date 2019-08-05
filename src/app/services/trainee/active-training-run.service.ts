import {Injectable} from "@angular/core";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../../model/level/abstract-level";
import {GameLevel} from "../../model/level/game-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {InfoLevel} from "../../model/level/info-level";
import {map} from "rxjs/operators";
import {TrainingRunFacade} from "../facades/training-run-facade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccessTrainingRunInfo} from "../../model/training/access-training-run-info";

/**
 * Service maintaining levels of training and active level instance for sub component of trainee training run
 */
@Injectable()
export class ActiveTrainingRunService {

  constructor(private trainingRunFacade: TrainingRunFacade,
              private router: Router) {
  }

  private _activeLevels: AbstractLevel[];
  private _activeLevel: GameLevel | AssessmentLevel | InfoLevel;
  private _startTime: Date;
  private _isStepperDisplayed: boolean;

  sandboxInstanceId: number;
  trainingRunId: number;

  private _onActiveLevelChangedSubject: Subject<AbstractLevel> = new Subject<AbstractLevel>();
  /**
   * Observable of active level changes
   * @type {Observable<AbstractLevel[]>}
   */
  onActiveLevelChanged: Observable<AbstractLevel> = this._onActiveLevelChangedSubject.asObservable();

  setUpFromTrainingRun(trainingRunInfo: AccessTrainingRunInfo) {
    this.trainingRunId = trainingRunInfo.trainingRunId;
    this.sandboxInstanceId = trainingRunInfo.sandboxInstanceId;
    this._isStepperDisplayed = trainingRunInfo.isStepperDisplayed;
    this._startTime = trainingRunInfo.startTime;
    this.initLevels(trainingRunInfo.levels);
    this.setActiveLevel(trainingRunInfo.currentLevel);
  }

  getLevels(): AbstractLevel[] {
    return this._activeLevels;
  }

  getActiveLevel(): AbstractLevel {
    return this._activeLevel;
  }

  getActiveLevelPosition(): number {
    return this._activeLevels.findIndex(level => level.id === this._activeLevel.id);
  }

  getStartTime(): Date {
    return this._startTime;
  }

  getIsStepperDisplayed(): boolean {
    return this._isStepperDisplayed;
  }

  /**
   * Sends request to move to next level. If response is successful, the next level in order is set as active
   */
  nextLevel(): Observable<AbstractLevel> {
    return this.trainingRunFacade.nextLevel(this.trainingRunId)
      .pipe(map(resp => {
        this.setActiveLevel(resp);
        return resp;
      }));
  }

  hasNextLevel(): boolean {
    return this._activeLevel.id !== this._activeLevels[this._activeLevels.length - 1].id;
  }

  finish(): Observable<any> {
    return this.trainingRunFacade.finishTrainingRun(this.trainingRunId)
      .pipe(map(resp => {
        this.clear();
        this.router.navigate(['trainee/training/' + this.trainingRunId + '/results'])
      }));
  }

  clear() {
    this._activeLevel = null;
    this._activeLevels = [];
  }

  private initLevels(levels: AbstractLevel[]) {
    this._activeLevels = levels;
  }

  private setActiveLevel(level: GameLevel | InfoLevel | AssessmentLevel) {
    this._activeLevel = level;
    this._onActiveLevelChangedSubject.next(this._activeLevel);
  }
}
