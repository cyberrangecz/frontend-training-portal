import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {ResourceSavedEvent} from '../../../model/events/resource-saved-event';
import {TrainingInstanceChangeEvent} from '../../../model/events/training-instance-change-event';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingInstanceEditService} from './training-instance-edit.service';

/**
 * Basic implementation of layer between component and API service.
 */
@Injectable()
export class TrainingInstanceEditConcreteService extends TrainingInstanceEditService {

  private trainingInstanceSubject: ReplaySubject<TrainingInstance> = new ReplaySubject();
  /**
   * Currently edited training instance
   */
  trainingInstance$: Observable<TrainingInstance> = this.trainingInstanceSubject.asObservable()
    .pipe(filter(ti => ti !== undefined && ti !== null));

  private editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * Current mode (edit - true or create - false)
   */
  editMode$: Observable<boolean> = this.editModeSubject.asObservable();

  private saveDisabledSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /**
   * True if it is possible to save edited training instance in its current state, false otherwise
   */
  saveDisabled$: Observable<boolean> = this.saveDisabledSubject.asObservable();

  private editedSnapshot: TrainingInstance;

  constructor(private trainingInstanceFacade: TrainingInstanceApi,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService) {
    super();
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training instance
   * @param changeEvent training instance object and its validity
   */
  change(changeEvent: TrainingInstanceChangeEvent) {
    this.saveDisabledSubject.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingInstance;
  }


  /**
   * Saves/creates training instance based on current edit mode or handles error.
   */
  save(): Observable<ResourceSavedEvent> {
    if (this.editModeSubject.getValue()) {
      return this.update()
        .pipe(map(id => new ResourceSavedEvent(id, true)));
    } else {
      return this.create()
        .pipe(map(id => new ResourceSavedEvent(id, false)));
    }
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
    }
    this.trainingInstanceSubject.next(ti);
  }

  private setEditMode(trainingInstance: TrainingInstance) {
    this.editModeSubject.next(trainingInstance !== null);
  }

  private update(): Observable<number> {
    return this.trainingInstanceFacade.update(this.editedSnapshot)
      .pipe(
        map(_ => this.editedSnapshot.id),
        tap(
          _ => {
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Training instance was successfully saved');
            this.onSaved();
          },
          err => this.errorHandler.display(err, 'Creating new training instance')
        )
      );
  }

  private create(): Observable<number> {
    return this.trainingInstanceFacade.create(this.editedSnapshot)
      .pipe(
        map(ti => ti.id),
        tap(_ => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training instance was successfully saved');
          this.onSaved();
        },
          err => this.errorHandler.display(err, 'Editing training instance')
        )
      );
  }

  private onSaved() {
    this.editModeSubject.next(true);
    this.saveDisabledSubject.next(true);
    this.trainingInstanceSubject.next(this.editedSnapshot);
    this.editedSnapshot = null;
  }
}
