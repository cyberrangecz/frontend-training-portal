import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, ReplaySubject} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {TrainingInstanceChangeEvent} from '../../../model/events/training-instance-change-event';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingInstanceEditService} from './training-instance-edit.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {Router} from '@angular/router';
import {SandboxInstanceApi} from 'kypo-sandbox-api';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class TrainingInstanceEditConcreteService extends TrainingInstanceEditService {

  private trainingInstanceSubject$: ReplaySubject<TrainingInstance> = new ReplaySubject();
  /**
   * Currently edited training instance
   */
  trainingInstance$: Observable<TrainingInstance> = this.trainingInstanceSubject$.asObservable()
    .pipe(filter(ti => ti !== undefined && ti !== null));

  private editModeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Current mode (edit - true or create - false)
   */
  editMode$: Observable<boolean> = this.editModeSubject$.asObservable();

  private saveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it is possible to save edited training instance in its current state, false otherwise
   */
  saveDisabled$: Observable<boolean> = this.saveDisabledSubject$.asObservable();

  private editedSnapshot: TrainingInstance;

  constructor(private trainingInstanceApi: TrainingInstanceApi,
              private sandboxInstanceApi: SandboxInstanceApi,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService) {
    super();
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training instance
   * @param changeEvent training instance object and its validity
   */
  change(changeEvent: TrainingInstanceChangeEvent) {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingInstance;
  }


  /**
   * Saves/creates training instance based on current edit mode or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      return this.update();
    } else {
      return this.create()
        .pipe(
          switchMap(_ => from(this.router.navigate([RouteFactory.toTrainingInstanceOverview()])))
        );
    }
  }

  createAndStay(): Observable<any> {
    return this.create()
      .pipe(
        switchMap(id =>  from(this.router.navigate([RouteFactory.toTrainingInstanceEdit(id)])))
      );
  }

  /**
   * Sets training instance as currently edited
   * @param trainingInstance to set as currently edited
   */
  set(trainingInstance: TrainingInstance) {
    let ti = trainingInstance;
    this.setEditMode(trainingInstance);
    if (ti === null) {
      ti = new TrainingInstance();
      const delay = 5;
      ti.startTime = new Date();
      ti.startTime.setMinutes(ti.startTime.getMinutes() + delay);
    }
    this.trainingInstanceSubject$.next(ti);
  }

  private setEditMode(trainingInstance: TrainingInstance) {
    this.editModeSubject$.next(trainingInstance !== null);
  }

  private update(): Observable<number> {
    return this.trainingInstanceApi.update(this.editedSnapshot)
      .pipe(
        map(_ => this.editedSnapshot.id),
        tap(
          _ => {
            this.alertService.emit('success', 'Training instance was successfully saved');
            this.onSaved();
          },
          err => this.errorHandler.emit(err, 'Creating new training instance')
        )
      );
  }

  private create(): Observable<number> {
    return this.trainingInstanceApi.create(this.editedSnapshot)
      .pipe(
        map(ti => ti.id),
        tap(_ => {
          this.alertService.emit('success', 'Training instance was created');
          this.onSaved();
        },
          err => this.errorHandler.emit(err, 'Creating training instance')
        )
      );
    }


  private onSaved() {
    this.editModeSubject$.next(true);
    this.saveDisabledSubject$.next(true);
    this.trainingInstanceSubject$.next(this.editedSnapshot);
    this.editedSnapshot = null;
  }
}
