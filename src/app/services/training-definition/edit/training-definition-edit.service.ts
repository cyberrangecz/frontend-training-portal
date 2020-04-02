import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Kypo2AuthService} from 'kypo2-auth';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {TrainingDefinitionChangeEvent} from '../../../model/events/training-definition-change-event';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RouteFactory} from '../../../model/routes/route-factory';

/**
 * Service handling editing of training definition and related operations.
 * Serves as a layer between component and API service
 * Subscribe to trainingDefinition$ to receive latest data updates.
 */
@Injectable()
export class TrainingDefinitionEditService {
  private trainingDefinitionSubject$: ReplaySubject<TrainingDefinition> = new ReplaySubject();
  /**
   * Currently edited training definition
   */
  trainingDefinition$: Observable<TrainingDefinition> = this.trainingDefinitionSubject$.asObservable()
    .pipe(filter(td => td !== undefined && td !== null));

  private editModeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * Current mode (edit - true or create - false)
   */
  editMode$ = this.editModeSubject$.asObservable();

  private saveDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  /**
   * True if it is possible to save edited training definition in its current state, false otherwise
   */
  saveDisabled$ = this.saveDisabledSubject$.asObservable();


  private editedSnapshot: TrainingDefinition;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private trainingDefinitionFacade: TrainingDefinitionApi,
              private authService: Kypo2AuthService,
              private errorHandler: ErrorHandlerService,
              private alertService: AlertService) {
  }

  /**
   * Sets training definition as currently edited
   * @param trainingDefinition to set as currently edited
   */
  set(trainingDefinition: TrainingDefinition) {
    let td = trainingDefinition;
    this.setEditMode(td);
    if (td === null) {
      td = new TrainingDefinition();
    }
    this.trainingDefinitionSubject$.next(td);
  }

  private setEditMode(trainingDefinition: TrainingDefinition) {
    this.editModeSubject$.next(trainingDefinition !== null);
  }

  /**
   * Saves/creates training definition based on edit mode or handles error.
   */
  save(): Observable<any> {
    if (this.editModeSubject$.getValue()) {
      return this.update();
    } else {
      return this.create()
        .pipe(
          map(_ => this.router.navigate([RouteFactory.toTrainingDefinitionOverview()]))
        );
    }
  }

  createAndStay(): Observable<any> {
    return this.create()
      .pipe(
        map(id =>  this.router.navigate([RouteFactory.toTrainingDefinitionEdit(id)]))
      );
  }

  /**
   * Updated saveDisabled$ and saved snapshot of edited training definition
   * @param changeEvent training definition object and its validity
   */
  change(changeEvent: TrainingDefinitionChangeEvent) {
    this.saveDisabledSubject$.next(!changeEvent.isValid);
    this.editedSnapshot = changeEvent.trainingDefinition;
  }

  private update(): Observable<number> {
    return this.trainingDefinitionFacade.update(this.editedSnapshot)
      .pipe(
        tap(id => {
          this.alertService.emit('success', 'Changes were saved');
          this.onSaved();
          },
            err => this.errorHandler.emit(err, 'Editing training definition')
        )
      );
  }

  private create(): Observable<number> {
   return this.trainingDefinitionFacade.create(this.editedSnapshot)
      .pipe(
        tap(
          _ => {
            this.alertService.emit('success', 'Training was created');
            this.onSaved();
            },
            err => this.errorHandler.emit(err, 'Creating new training definition')
        ),
        map(td => td.id)
      );
  }

  private onSaved() {
    this.editModeSubject$.next(true);
    this.saveDisabledSubject$.next(true);
    this.trainingDefinitionSubject$.next(this.editedSnapshot);
    this.editedSnapshot = null;
  }
}
