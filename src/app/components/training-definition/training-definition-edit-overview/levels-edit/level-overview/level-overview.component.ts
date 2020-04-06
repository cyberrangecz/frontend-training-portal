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
import {Observable} from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import {LevelMoveEvent} from '../../../../../model/events/level-move-event';
import {Level} from 'kypo-training-model';
import {TrainingDefinition} from 'kypo-training-model';
import {LevelEditService} from '../../../../../services/training-definition/edit/level-edit.service';
import {KypoBaseComponent} from 'kypo-common';
import {LevelStepperAdapter} from '../../../../../model/stepper/level-stepper-adapter';
import {LevelOverviewControls} from './level-overview-controls';
import {KypoControlItem} from 'kypo-controls';

/**
 * Smart component for level stepper and level edit components
 */
@Component({
  selector: 'kypo2-level-overview',
  templateUrl: './level-overview.component.html',
  styleUrls: ['./level-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelOverviewComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Output() unsavedLevels: EventEmitter<Level[]> = new EventEmitter();
  @Output() levelsCount: EventEmitter<number> = new EventEmitter();
  @Input() trainingDefinition: TrainingDefinition;

  activeStep$: Observable<number>;
  stepperLevels: Observable<LevelStepperAdapter[]>;
  controls: KypoControlItem[];
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
        tap(_ => this.levelsCount.emit(this.levelService.getLevelsCount())),
      );

    this.levelService.unsavedLevels$
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(unsavedLevels => this.unsavedLevels.emit(unsavedLevels));
    this.initControl();
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

  onControlAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
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
        },
        _ => this.levelMovingInProgress = false
      );
  }

  /**
   * Calls service to change active level
   * @param level level to set as active
   */
  onActiveLevelChanged(level: Level) {
    this.levelService.onActiveLevelChanged(level);
  }

  private initControl() {
    const saveDisabled$ = this.levelService.activeLevelCanBeSaved$
      .pipe(
        map(canBeSaved => !canBeSaved)
      );

    const deleteDisabled$ = this.levelService.levels$.pipe(
      map(levels => levels.length <= 0)
    );
    this.controls = LevelOverviewControls.create(this.levelService, saveDisabled$, deleteDisabled$);
  }
}
