import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {takeWhile} from 'rxjs/operators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {BaseComponent} from '../../../../../../../base.component';
import {Hint} from '../../../../../../../../model/level/hint';
import {ActionConfirmationDialogComponent} from '../../../../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {StepperInterface} from 'kypo2-stepper';

@Component({
  selector: 'kypo2-hints-overview',
  templateUrl: './hints-overview.component.html',
  styleUrls: ['./hints-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
/**
 * Hint stepper component, to navigate through existing hints and creating new hints
 */
export class HintsOverviewComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() hints: Hint[];
  @Input() levelMaxScore: number;
  @Output() hintsChange: EventEmitter<Hint[]> = new EventEmitter();

  hintsHasErrors: boolean;
  penaltySum: number;
  selectedStep: number;
  isLoading = false;

  stepperHints: StepperInterface<Hint> = {items: this.hints, isLocalChange: true, isLoading: this.isLoading};

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.selectedStep = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('hints' in changes) {
      this.stepperHints.items = this.hints;
      this.setInitialHintPenaltySum();
      this.calculateHasError();
    }
  }

  /**
   * Creates new hint with default values
   */
  addHint() {
    if (this.stepperHints.items.length >= 1) {
      this.stepperHints.items[this.selectedStep].isActive = false;
    }
    const hint = new Hint();
    hint.title = 'New hint';
    hint.penalty = 0;
    hint.isActive = true;
    hint.content = 'Write hint content here...';
    hint.order = this.stepperHints.items.length;
    this.stepperHints.items.push(hint);
    this.selectedStep = this.stepperHints.items.length - 1;
    this.hintsChanged();
  }

  /**
   * Deletes given hint from list of hints
   * @param {Hint} hint hint which should be deleted
   */
  deleteHint() {
    const hint = this.stepperHints.items[this.selectedStep];
    const index = this.selectedStep;
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'hint',
        action: 'delete',
        title: hint.title
      }
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
            this.stepperHints.items.splice(index, 1);
          this.changeSelectedStepAfterRemoving(index);
          this.orderUpdate();
        }
      });
  }

  /**
   * Triggered after selection of active level is changes in the stepper
   * @param event event of active level change
   */
  selectionChanged(event) {
    if (event !== this.selectedStep && this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.selectedStep].isActive = false;
      this.selectedStep = event;
    }
  }

  orderUpdate() {
    this.stepperHints.items.forEach((hint, index) => {
      this.stepperHints.items[index].order = index;
    });
    this.hintsChanged();
  }

  /**
   * Changes selected step to the one before removed or to first one if the first step is removed
   * @param {number} index index of the removed step
   */
  private changeSelectedStepAfterRemoving(index: number) {
    if (index === 0) {
      this.selectedStep = 0;
    } else {
      this.selectedStep--;
    }
    this.selectionChanged(this.stepperHints.items.length - 1);
    if (this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.stepperHints.items.length - 1].isActive = true;
    }
  }

  /**
   * Emits event if new hint is added or saved
   */
  private hintsChanged(hint: Hint = null) {
    if (hint) {
      this.stepperHints.items[this.selectedStep] = hint;
    }
    this.calculateHintPenaltySum();
    this.calculateHasError();
    this.hintsChange.emit(this.stepperHints.items);
  }


  private calculateHasError() {
    this.hintsHasErrors = this.hints.some(hint => !hint.valid);
  }

  /**
   * Calculates and sets initial hint penalty sum from level max score and sum of hints penalties.
   * Should be used only to calculate the sum BEFORE hint components are initialized
   */
  private setInitialHintPenaltySum() {
    if (this.hints.length === 0) {
      this.penaltySum = 0;
    } else {
      this.penaltySum = this.hints
        .map(hint => hint.penalty)
        .reduce((sum, currentPenalty) => sum + currentPenalty);
    }
  }

  /**
   * Calculates max hint penalty from level max score and sum of hints penalties. Updates initial penalty sum for new added hints
   * Should be used only to calculate the sum AFTER hint components are initialized
   */
  private calculateHintPenaltySum() {
    let hintsPenaltySum = 0;
    this.stepperHints.items.forEach(hint => {
      hintsPenaltySum += hint.penalty;
    });
    this.penaltySum = hintsPenaltySum;
  }
}
