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
  @Input('hints') hints: Hint[];
  @Input('levelMaxScore') levelMaxScore: number;
  @Input('disabled') disabled: boolean;

  @Output('hints') hintsChange = new EventEmitter();

  @ViewChildren(HintDetailEditComponent) hintConfigurationChildren: QueryList<HintDetailEditComponent>;

  dirty = false;
  valid: boolean;
  initialPenaltySum: number;
  selectedStep: number;

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
    const hint = new Hint();
    hint.title = 'New hint';
    hint.content = '';
    hint.hintPenalty = 0;
    this.hintsArray.push(new FormControl(hint));
    this.hints.push(hint);
    this.hintStepperFormGroup.formGroup.markAsDirty();
    this.hintsChanged();
    this.validityChanged();
    // hack to workaround bug in cdkStepper library
    setTimeout(() => {this.selectedStep = this.hintsArray.length - 1;
                      this.validityChanged(); }, 1);
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
            this.hints.splice(index, 1);
          }
          this.changeSelectedStepAfterRemoving(index);
          this.hintStepperFormGroup.formGroup.markAsDirty();
          this.hintsChanged();
        }
      });
  }

  /**
   * Triggered after selection of active level is changes in the stepper
   * @param event event of active level change
   */
  selectionChanged(event) {
    this.selectedStep = event.selectedIndex;
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
  }

  /**
   * Initializes hints if no hints are passed from parents component
   */
  private resolveInitialHints() {
    if (this.hints) {
      this.hints.forEach(hint => {
        this.hintsArray.push(new FormControl(hint));
      });
    }
  }

  /**
   * Emits event if new hint is added or saved
   */
  private hintsChanged() {
    this.hintsChange.emit(this.hintsArray.value);
  }

    /**
   * Emits event if new hint validity is changed
   */
  validityChanged() {
    if (this.hintConfigurationChildren && this.hintConfigurationChildren.length != 0) {
      this.hintConfigurationChildren.forEach((child, index) => {
        child.valid
          ? this.hintsArray.at(index).setErrors(null)
          : this.hintsArray.at(index).setErrors({ required: true });
      });
      this.valid = this.hintConfigurationChildren
        .map(child => child.valid)
        .reduce((accumulator, hint) => accumulator && hint, true);
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
    const hintsPenaltySum = this.hintConfigurationChildren
      .map(child => child.hintPenalty.value)
      .reduce((sum, currentPenalty) => sum + currentPenalty);
    this.initialPenaltySum = hintsPenaltySum;
    this.hintConfigurationChildren.forEach(child =>
      child.calculateMaxHintPenalty(hintsPenaltySum)
    );
  }
}
