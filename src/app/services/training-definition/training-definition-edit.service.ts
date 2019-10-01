import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {TrainingDefinition} from '../../model/training/training-definition';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDefinitionFacade} from '../facades/training-definition-facade.service';
import {Kypo2AuthService} from 'kypo2-auth';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {AlertService} from '../shared/alert.service';
import {filter, map, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {TrainingDefinitionChangeEvent} from '../../model/events/training-definition-change-event';
import {ResourceSavedEvent} from '../../model/events/resource-saved-event';

@Injectable()
export class TrainingDefinitionEditService {
  private trainingDefinitionSubject: ReplaySubject<TrainingDefinition> = new ReplaySubject();
  trainingDefinition$: Observable<TrainingDefinition> = this.trainingDefinitionSubject.asObservable()
    .pipe(filter(td => td !== undefined && td !== null));

  private editModeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  editMode$ = this.editModeSubject.asObservable();

  private saveDisabledSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  saveDisabled$ = this.saveDisabledSubject.asObservable();


  private editedTrainingDefinition: TrainingDefinition;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private trainingDefinitionFacade: TrainingDefinitionFacade,
              private authService: Kypo2AuthService,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService) {
  }

  set(trainingDefinition: TrainingDefinition) {
    let td = trainingDefinition;
    this.setEditMode(td);
    if (td === null) {
      td = new TrainingDefinition();
    }
    this.trainingDefinitionSubject.next(td);
  }

  private setEditMode(trainingDefinition: TrainingDefinition) {
    this.editModeSubject.next(trainingDefinition !== null);
  }

  /**
   * Sends request to endpoint to save changes in edited training definition or to create a new one based on currently active mode
   */
  save(): Observable<ResourceSavedEvent> {
    if (this.editModeSubject.getValue()) {
      return this.updateTrainingDefinition()
        .pipe(map(id => new ResourceSavedEvent(id, true)));
    } else {
      return this.createTrainingDefinition()
        .pipe(map(id => new ResourceSavedEvent(id, false)));
    }
  }

  change(changeEvent: TrainingDefinitionChangeEvent) {
    this.saveDisabledSubject.next(!changeEvent.isValid);
    this.editedTrainingDefinition = changeEvent.trainingDefinition;
  }

  private updateTrainingDefinition(): Observable<number> {
    return this.trainingDefinitionFacade.update(this.editedTrainingDefinition)
      .pipe(
        tap(id => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Changes were successfully saved.');
          this.onSaved();
          },
            err => this.errorHandler.display(err, 'Editing training definition')
        )
      );
  }

  private createTrainingDefinition(): Observable<number> {
   return this.trainingDefinitionFacade.create(this.editedTrainingDefinition)
      .pipe(
        tap(
          id => {
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Training was successfully saved.');
            this.onSaved();
            },
            err => this.errorHandler.display(err, 'Creating new training definition')
        )
      );
  }

  private onSaved() {
    this.editModeSubject.next(true);
    this.saveDisabledSubject.next(true);
    this.trainingDefinitionSubject.next(this.editedTrainingDefinition);
    this.editedTrainingDefinition = null;
  }
}
