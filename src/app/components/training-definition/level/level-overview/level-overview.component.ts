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
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap, takeWhile, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import {BaseComponent} from '../../../base.component';
import {ActionConfirmationDialogComponent} from '../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {LevelEditService} from '../../../../services/training-definition/level-edit.service';
import {AbstractLevelTypeEnum} from '../../../../model/enums/abstract-level-type.enum';
import {LevelMoveEvent} from '../../../../model/events/level-swap-event';
import {TrainingDefinition} from '../../../../model/training/training-definition';

@Component({
  selector: 'kypo2-level-overview',
  templateUrl: './level-overview.component.html',
  styleUrls: ['./level-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Smart wrapper component for level stepper and level edit components
 */
export class LevelOverviewComponent extends BaseComponent implements OnInit, OnChanges {

  @Output() unsavedLevels: EventEmitter<AbstractLevel[]> = new EventEmitter();
  @Output() levelsCount: EventEmitter<number> = new EventEmitter();
  @Input() trainingDefinition: TrainingDefinition;

  activeStep$: Observable<number>;
  levels$: Observable<AbstractLevel[]>;
  activeLevelCanBeSaved$: Observable<boolean>;
  levelMovingInProgress: boolean;

  constructor(private activeRoute: ActivatedRoute,
              private dialog: MatDialog,
              private levelService: LevelEditService) {
    super();
  }

  ngOnInit() {
    this.activeStep$ = this.levelService.activeStep$;
    this.levels$ = this.levelService.levels$
      .pipe(
        tap(_ => this.unsavedLevels.emit(this.levelService.getUnsavedLevels()))
      );
    this.activeLevelCanBeSaved$ = this.levelService.activeLevelCanBeSaved$.pipe(debounceTime(0));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingDefinition' in changes) {
      this.levelService.set(this.trainingDefinition.id, this.trainingDefinition.levels);

    }
  }

  onActiveLevelChange(stepIndex: number) {
    this.levelService.setActiveStep(stepIndex);
  }

  /**
   * Creates new game level with default values
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

  onLevelMoved(event: LevelMoveEvent) {
    this.levelMovingInProgress = true;
    this.levelService.move(event.indexes.previousIndex, event.indexes.currentIndex)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(
        _ => {
          this.levelMovingInProgress = false;
          this.levelService.setActiveStep(event.indexes.currentIndex);
        },
        _ => this.levelMovingInProgress = false
      );
  }

  onDeleteLevel() {
    this.showDialogBeforeDeleting(this.levelService.getSelected());
  }

  onSave() {
    const level = this.levelService.getSelected();
    this.levelService.save(level)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ =>  this.unsavedLevels.emit(this.levelService.getUnsavedLevels()));
  }

  onActiveLevelChanged(level: AbstractLevel) {
    this.levelService.onActiveLevelChanged(level);
  }

  private showDialogBeforeDeleting(level: AbstractLevel) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data:
        {
          type: 'level',
          action: 'delete',
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

}
