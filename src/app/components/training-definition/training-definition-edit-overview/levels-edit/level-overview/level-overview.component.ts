import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {debounceTime, map, switchMap, takeWhile, tap} from 'rxjs/operators';
import {AbstractLevelTypeEnum} from '../../../../../model/enums/abstract-level-type.enum';
import {LevelMoveEvent} from '../../../../../model/events/level-move-event';
import {Level} from '../../../../../model/level/level';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {LevelEditService} from '../../../../../services/training-definition/edit/level-edit.service';
import {BaseComponent} from '../../../../base.component';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {ConfirmationDialogActionEnum} from '../../../../../model/enums/confirmation-dialog-action-enum';
import {LevelStepperAdapter} from '../../../../../model/stepper/level-stepper-adapter';

/**
 * Smart component for level stepper and level edit components
 */
@Component({
  selector: 'kypo2-level-overview',
  templateUrl: './level-overview.component.html',
  styleUrls: ['./level-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelOverviewComponent extends BaseComponent implements OnInit, OnChanges {

  @Output() unsavedLevels: EventEmitter<Level[]> = new EventEmitter();
  @Output() levelsCount: EventEmitter<number> = new EventEmitter();
  @Input() trainingDefinition: TrainingDefinition;

  activeStep$: Observable<number>;
  stepperLevels: Observable<LevelStepperAdapter[]>;
  activeLevelCanBeSaved$: Observable<boolean>;
  levelMovingInProgress: boolean;

  constructor(private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private levelService: LevelEditService) {
    super();
  }

  ngOnInit() {
    this.activeStep$ = this.levelService.activeStep$;
    this.stepperLevels = this.levelService.levels$
      .pipe(
        map(levels => levels.map(level => new LevelStepperAdapter(level))),
        tap(_ => this.unsavedLevels.emit(this.levelService.getUnsavedLevels()))
      );
    this.activeLevelCanBeSaved$ = this.levelService.activeLevelCanBeSaved$.pipe(debounceTime(0));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingDefinition' in changes) {
      this.levelService.set(this.trainingDefinition.id, this.trainingDefinition.levels);
    }
  }

  /**
   * Calls service to set new active level
   * @param levelIndex index of new active level
   */
  onActiveLevelChange(levelIndex: number) {
    this.levelService.setActiveLevel(levelIndex);
  }

  /**
   * Calls service to create new level of selected type
   * @param levelType type of level to create
   */
  addLevel(levelType: AbstractLevelTypeEnum) {
    this.levelService.add(levelType)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => {
        this.levelService.navigateToLastLevel();
        this.levelsCount.emit(this.levelService.getLevelsCount());
      }
      );
  }

  /**
   * Call service to move level from original position to a new one
   * @param event event of level move
   */
  onLevelMoved(event: LevelMoveEvent) {
    this.levelMovingInProgress = true;
    this.levelService.move(event.stepperStateChange.previousIndex, event.stepperStateChange.currentIndex)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(
        _ => {
          this.levelMovingInProgress = false;
          this.levelService.setActiveLevel(event.stepperStateChange.currentIndex);
        },
        _ => this.levelMovingInProgress = false
      );
  }

  /**
   * Shows confirmation dialog to delete currently active level, calls service to delete the level, if confirmed
   */
  onDeleteLevel() {
    const level = this.levelService.getSelected();
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data:
        {
          type: 'level',
          action: ConfirmationDialogActionEnum.DELETE,
          title: level.title
        }
    });
    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result => result && result.type === 'confirm' ? this.levelService.delete(level) : of(null))
      ).subscribe(_ => this.levelsCount.emit(this.levelService.getLevelsCount())
    );
  }

  /**
   * Calls service to save currently active level
   */
  onSave() {
    this.levelService.forceStepperUpdate();
    const level = this.levelService.getSelected();
    this.levelService.save(level)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.unsavedLevels.emit(this.levelService.getUnsavedLevels()));
  }

  /**
   * Calls service to change active level
   * @param level level to set as active
   */
  onActiveLevelChanged(level: Level) {
    this.levelService.onActiveLevelChanged(level);
  }

}
