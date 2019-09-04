import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {HintDetailEditComponent} from '../hint-detail-edit/hint-detail-edit.component';
import { MatDialog } from '@angular/material/dialog';
import {takeWhile} from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HintStepperFormGroup } from './hint-stepper-form-group';
import { FormArray, FormControl } from '@angular/forms';
import {BaseComponent} from '../../../../../../base.component';
import {Hint} from '../../../../../../../model/level/hint';
import {ActionConfirmationDialogComponent} from '../../../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {AbstractStepItem, StepperInterface} from 'kypo2-stepper';

@Component({
  selector: 'kypo2-hint-stepper',
  templateUrl: './hint-stepper.component.html',
  styleUrls: ['./hint-stepper.component.css'],
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
export class HintStepperComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input() hints: Hint[];
  @Input() levelMaxScore: number;
  @Input() disabled: boolean;

  @Output() hintsChange: EventEmitter<Hint[]> = new EventEmitter();

  @ViewChildren(HintDetailEditComponent) hintConfigurationChildren: QueryList<HintDetailEditComponent>;

  dirty = false;
  valid: boolean;
  initialPenaltySum: number;
  selectedStep: number;
  isLoading = false;

  items: AbstractStepItem[] = [];
  stepperHints: StepperInterface<Hint> = {items: this.items as Hint[], isLocalChange: true, isLoading: this.isLoading};

  hintStepperFormGroup: HintStepperFormGroup;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.selectedStep = 0;
  }

  get hintsArray() {
    return <FormArray>this.hintStepperFormGroup.formGroup.get('hints');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.hintStepperFormGroup) {
      this.hintStepperFormGroup = new HintStepperFormGroup();
      this.validityChanged();
    }
    if ('hints' in changes) {
      this.resolveInitialHints();
      this.setInitialHintPenaltySum();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return (
      !this.hintStepperFormGroup.formGroup.dirty &&
      this.hintConfigurationChildren
        .toArray()
        .every(child => child.canDeactivate())
    );
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
    hint.content = '';
    hint.hintPenalty = 0;
    hint.isSaved = false;
    hint.icon = 'help_outline';
    hint.isActive = true;
    hint.isValid = false;
    hint.order = this.stepperHints.items.length;
    this.hintsArray.push(new FormControl(hint));
    this.items.push(hint);
    this.selectedStep = this.stepperHints.items.length - 1;

    this.hintStepperFormGroup.formGroup.markAsDirty();
    this.hintsChanged();
    this.validityChanged();
  }

  /**
   * Saves all created hints
   */
  saveChanges() {
    this.hintConfigurationChildren.forEach(child => child.saveChanges());
    this.hintStepperFormGroup.formGroup.markAsPristine();
  }

  /**
   * Deletes given hint from list of hints
   * @param {Hint} hint hint which should be deleted
   */
  deleteHint(hint: Hint) {
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
          const index = this.hintsArray.value.indexOf(hint);
          if (index > -1) {
            this.hintsArray.removeAt(index);
            this.stepperHints.items.splice(index, 1);
          }
          this.changeSelectedStepAfterRemoving(index);
          this.hintStepperFormGroup.formGroup.markAsDirty();
          this.orderUpdate();
          this.hintsChanged();
        }
      });
  }

  /**
   * Triggered after selection of active level is changes in the stepper
   * @param event event of active level change
   */
  selectionChanged(event) {
    if (event !== this.selectedStep) {
      this.validityChanged();
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
    this.stepperHints.items[this.stepperHints.items.length - 1].isActive = true;
  }

  /**
   * Actualizes stepper content if any hints are inserted from saved hints
   */
  private pushHintsToStepper() {
    if (this.hints.length > 0) {

      this.hints.forEach(hint => {
        hint.icon = 'help_outline';
        hint.isSaved = false;
        hint.isValid = this.resolveInitialValidity(hint);
        this.hintsArray.push(new FormControl(hint));
      });

      this.items = this.hints;
      this.stepperHints.items = this.items as Hint[];
      this.stepperHints.items[0].isActive = true;
      this.selectedStep = 0;
    }
  }
  /**
   * Initializes hints if no hints are passed from parents component
   */
  private resolveInitialHints() {
    if (!this.stepperHints.items) {
      this.stepperHints.items = [];
    } else {
      this.pushHintsToStepper();
    }
  }
  private resolveInitialValidity(hint: Hint): boolean {
    return hint.hintPenalty !== null && hint.content !== '' && hint.title !== null;
  }

  /**
   * Emits event if new hint is added or saved
   */
  private hintsChanged(hint: Hint = null) {
    if (hint) {
      this.stepperHints.items[this.selectedStep] = hint;
    }
    this.validityChanged();
    this.hintsChange.emit(this.stepperHints.items);
  }

  /**
   * Emits event if new hint validity is changed
   */
  validityChanged() {
    if (this.stepperHints.items && this.stepperHints.items.length !== 0) {

      this.stepperHints.items.forEach((hint, index) => {
        if (hint.isValid) {
          this.hintsArray.at(index).setErrors(null);
          this.stepperHints.items[index].isSaved = true;
        } else {
          this.hintsArray.at(index).setErrors({ required: true });
          this.stepperHints.items[index].isSaved = false;
        }
      });
    }
  }

  /**
   * Calculates and sets initial hint penalty sum from level max score and sum of hints penalties.
   * Should be used only to calculate the sum BEFORE hint components are initialized
   */
  private setInitialHintPenaltySum() {
    if (this.hintsArray.length === 0) {
      this.initialPenaltySum = 0;
    } else {
      this.initialPenaltySum = this.hintsArray.value
        .map(hint => hint.hintPenalty)
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
      hintsPenaltySum += hint.hintPenalty;
    });
    this.initialPenaltySum = hintsPenaltySum;
    this.hintConfigurationChildren.forEach(child =>
      child.calculateMaxHintPenalty(hintsPenaltySum)
    );
  }
}
