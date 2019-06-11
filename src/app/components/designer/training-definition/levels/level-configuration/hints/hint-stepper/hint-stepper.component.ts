import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {Hint} from "../../../../../../../model/level/hint";
import {HintConfigurationComponent} from "../hint-configuration/hint-configuration.component";
import {MatDialog} from "@angular/material";
import {DeleteDialogComponent} from "../../../../../../shared/delete-dialog/delete-dialog.component";

@Component({
  selector: 'hint-stepper',
  templateUrl: './hint-stepper.component.html',
  styleUrls: ['./hint-stepper.component.css']
})
/**
 * Hint stepper component, to navigate through existing hints and creating new hints
 */
export class HintStepperComponent implements OnInit, OnChanges {

  @Input('hints') hints: Hint[];
  @Input('levelMaxScore') levelMaxScore: number;
  @Input('disabled') disabled: boolean;

  @Output('hints') hintsChange = new EventEmitter();

  @ViewChildren(HintConfigurationComponent) hintConfigurationChildren: QueryList<HintConfigurationComponent>;

  dirty = false;
  initialPenaltySum: number;
  selectedStep: number;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.selectedStep = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
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
    return !this.dirty && this.hintConfigurationChildren.toArray().every(child => child.canDeactivate());
  }

  /**
   * Creates new hint with default values
   */
  addHint() {
    const hint = new Hint();
    hint.title = 'New hint';
    hint.content = '';
    hint.hintPenalty = 0;
    this.hints.push(hint);
    this.dirty = true;
    this.hintsChanged();
    // hack to workaround bug in cdkStepper library
    setTimeout(() => this.selectedStep = this.hints.length - 1, 1);
  }

  /**
   * Saves all created hints
   */
  saveChanges() {
    this.hintConfigurationChildren.forEach(child => child.saveChanges());
    this.dirty = false;
  }

  /**
   * Deletes given hint from list of hints
   * @param {Hint} hint hint which should be deleted
   */
  deleteHint(hint: Hint) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data:
      {
      type: 'hint',
      title: hint.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        const index = this.hints.indexOf(hint);
        if (index > - 1) {
          this.hints.splice(index, 1);
        }
        this.changeSelectedStepAfterRemoving(index);
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
    if (!this.hints) {
      this.hints = [];
    }
  }

  /**
   * Emits event if new hint is added or saved
   */
  private hintsChanged() {
    this.hintsChange.emit(this.hints);
  }

  /**
   * Calculates and sets initial hint penalty sum from level max score and sum of hints penalties.
   * Should be used only to calculate the sum BEFORE hint components are initialized
   */
  private setInitialHintPenaltySum() {
    if (this.hints.length === 0) {
      this.initialPenaltySum = 0;
    } else {
      this.initialPenaltySum = this.hints.map(hint => hint.hintPenalty)
        .reduce((sum, currentPenalty) => sum + currentPenalty);
    }
  }

  /**
   * Calculates max hint penalty from level max score and sum of hints penalties. Updates initial penalty sum for new added hints
   * Should be used only to calculate the sum AFTER hint components are initialized
   */
  private calculateHintPenaltySum() {
    const hintsPenaltySum = this.hintConfigurationChildren.map(child => child.hintPenalty)
      .reduce((sum, currentPenalty) => sum + currentPenalty);
    this.initialPenaltySum = hintsPenaltySum;
    this.hintConfigurationChildren.forEach(child => child.calculateMaxHintPenalty(hintsPenaltySum));
  }

}
