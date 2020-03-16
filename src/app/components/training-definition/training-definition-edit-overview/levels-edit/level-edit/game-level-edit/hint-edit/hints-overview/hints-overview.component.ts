import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
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
import {Kypo2Stepper} from 'kypo2-stepper';
import {takeWhile} from 'rxjs/operators';
import {Hint} from '../../../../../../../../model/level/hint';
import {KypoBaseComponent} from 'kypo-common';
import {HintStepperAdapter} from '../../../../../../../../model/stepper/hint-stepper-adapter';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-common';
import { BehaviorSubject, defer, of } from 'rxjs';
import { KypoControlItem } from 'kypo-controls';


/**
 * Main hint edit component. Contains stepper to navigate through existing hints and controls to create new hints
 */
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
export class HintsOverviewComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() hints: Hint[];
  @Input() levelId: Hint[];
  @Input() levelMaxScore: number;
  @Output() hintsChange: EventEmitter<Hint[]> = new EventEmitter();

  private deleteDisabledSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  hintsHasErrors: boolean;
  penaltySum: number;
  selectedStep: number;
  stepperHints: Kypo2Stepper<HintStepperAdapter> = { items: [] };
  controls: KypoControlItem[];

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.selectedStep = 0;
    this.initControls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('levelId' in changes) {
      this.selectedStep = 0;
    }
    if ('hints' in changes) {
      this.deleteDisabledSubject$.next(this.hints.length <= 0);
      this.stepperHints.items = this.hints.map(hint => new HintStepperAdapter(hint));
      this.setInitialHintPenaltySum();
      this.calculateHasError();
    }
  }

  onControlAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
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
    hint.content = 'Write hint content here...';
    hint.order = this.stepperHints.items.length;
    const hintStepperAdapter = new HintStepperAdapter(hint);
    hintStepperAdapter.isActive = true;
    this.stepperHints.items.push(hintStepperAdapter);
    this.selectedStep = this.stepperHints.items.length - 1;
    this.onHintsChanged();
  }

  /**
   * Displays confirmation dialog window, if confirmed, deletes given active hint from list of hints
   */
  deleteActiveHint() {
    const hint = this.stepperHints.items[this.selectedStep];
    const index = this.selectedStep;
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Hint',
        `Do you want to delete hint "${hint.title}"?`,
        'Cancel',
        'Delete'
      )
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result === CsirtMuDialogResultEnum.CONFIRMED) {
          this.stepperHints.items.splice(index, 1);
          this.changeSelectedStepAfterRemoving(index);
          this.onOrderUpdate();
        }
      });
  }

  /**
   * Triggered after selection of active hint is changed in the stepper
   * @param index index of active hint
   */
  onActiveHintChanged(index: number) {
    if (index !== this.selectedStep && this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.selectedStep].isActive = false;
      this.selectedStep = index;
    }
  }

  /**
   * Updates order of stepper items to match order of the hints
   */
  onOrderUpdate() {
    this.stepperHints.items.forEach((hint, index) => {
      this.stepperHints.items[index].hint.order = index;
    });
    this.onHintsChanged();
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
    this.onActiveHintChanged(this.stepperHints.items.length - 1);
    if (this.stepperHints.items.length > 0) {
      this.stepperHints.items[this.stepperHints.items.length - 1].isActive = true;
    }
  }

  /**
   * Emits event if new hint is added or saved
   */
  private onHintsChanged(hint: Hint = null) {
    if (hint) {
      this.stepperHints.items[this.selectedStep].hint = hint;
    }
    this.calculateHintPenaltySum();
    this.calculateHasError();
    this.hintsChange.emit(this.stepperHints.items.map(item => item.hint));
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
    this.stepperHints.items.forEach(item => {
      hintsPenaltySum += item.hint.penalty;
    });
    this.penaltySum = hintsPenaltySum;
  }

  private initControls() {
    this.controls = [
      new KypoControlItem(
        'add',
        'Add',
        'primary',
        of(false),
        defer(() => this.addHint())
      ),
      new KypoControlItem(
        'delete',
        'Delete',
        'warn',
        this.deleteDisabledSubject$.asObservable(),
        defer(() => this.deleteActiveHint())
      )
    ];
  }
}
