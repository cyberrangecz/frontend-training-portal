import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {ResourceSavedEvent} from '../../model/events/resource-saved-event';
import {TrainingInstanceChangeEvent} from '../../model/events/training-instance-change-event';
import {TrainingInstance} from '../../model/training/training-instance';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {AlertService} from '../shared/alert.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingInstanceEditService} from './training-instance-edit.service';

@Injectable()
export class TrainingInstanceEditConcreteService extends TrainingInstanceEditService {

  private trainingInstanceSubject: ReplaySubject<TrainingInstance> = new ReplaySubject();
  trainingInstance$: Observable<TrainingInstance> = this.trainingInstanceSubject.asObservable()
    .pipe(filter(ti => ti !== undefined && ti !== null));

  private editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode$: Observable<boolean> = this.editModeSubject.asObservable();

  private saveDisabledSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  saveDisabled$: Observable<boolean> = this.saveDisabledSubject.asObservable();

  private editedSnapshot: TrainingInstance;

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService) {
    super();
  }

  change(changeEvent: TrainingInstanceChangeEvent) {
    this.saveDisabledSubject.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingInstance;
  }


  save(): Observable<ResourceSavedEvent> {
    if (this.editModeSubject.getValue()) {
      return this.update()
        .pipe(map(id => new ResourceSavedEvent(id, true)));
    } else {
      return this.create()
        .pipe(map(id => new ResourceSavedEvent(id, false)));
    }
  }

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
