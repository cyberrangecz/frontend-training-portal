import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Hint} from "../../../../../../../model/level/hint";
import {AlertTypeEnum} from "../../../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../../../services/event-services/alert.service";
import {environment} from "../../../../../../../../environments/environment";

@Component({
  selector: 'hint-configuration',
  templateUrl: './hint-configuration.component.html',
  styleUrls: ['./hint-configuration.component.css']
})
/**
 * Component for configuration of new or existing game level hint
 */
export class HintConfigurationComponent implements OnInit, OnChanges {

  @Input('hint') hint: Hint;
  @Input('levelMaxScore') levelMaxScore: number;
  @Input('initHintPenaltySum') initHintPenaltySum: number;
  @Input('order') order: number;

  @Output('hint') hintChange = new EventEmitter();
  @Output('penaltyChange') penaltyChange = new EventEmitter<number>();
  @Output('deleteHint') deleteHint = new EventEmitter<Hint>();
  title: string;
  content: string;
  hintPenalty: number;

  maxHintPenalty: number;
  dirty = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('hint' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty;
  }

  /**
   * Validates user input, sets input values to hint object and saves hints through REST API
   */
  saveChanges() {
    if (this.validateInput()) {
      this.setInputValuesToHint();
      this.hintChanged();
      this.dirty = false;
        // TODO: save through rest api
    }
  }

  /**
   * Reacts on changes in inputs. Sets dirty to true
   */
  onContentChanged() {
    this.dirty = true;
  }

  /**
   * Reacts on changes in hint penalty input
   */
  onPenaltyChanged() {
    this.penaltyChange.emit();
  }

  /**
   * Calculates maximal value of hint penalty (sum of all hint penalties must be lower then level max score)
   */
  calculateMaxHintPenalty(hintsPenaltySum: number) {
    this.maxHintPenalty = this.levelMaxScore - (hintsPenaltySum - this.hintPenalty);
  }

  /**
   * Emits event to delete this hint
   */
  onDeleteHint() {
    this.deleteHint.emit(this.hint);
  }

  /**
   * Emits event if hint is saved
   */
  private hintChanged() {
    this.hintChange.emit(this.hint);
  }

  /**
   * Sets initial values from hint object to inputs (edit mode)
   */
  private setInitialValues() {
    this.title = this.hint.title;
    this.content = this.hint.content;
    this.hintPenalty = this.hint.hintPenalty;
    this.calculateInitialMaxHintPenalty();
  }

  /**
   * Sets values from user input values to hint object
   */
  private setInputValuesToHint() {
    this.hint.title = this.title;
    this.hint.content = this.content;
    this.hint.hintPenalty = this.hintPenalty;
  }

  private calculateInitialMaxHintPenalty() {
    this.maxHintPenalty = this.levelMaxScore - (this.initHintPenaltySum - this.hintPenalty);
  }

  /**
   * Validates user input, displays error message if errors are found
   * @returns {boolean} true if user input passes the validation, false otherwise
   */
  private validateInput(): boolean {
    let errorTitle = 'Hint ' + (this.order + 1) + ':\n';
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.content || this.content.replace(/\s/g, '') === '') {
      errorMessage += 'Content cannot be empty\n'
    }

    if (Number.isNaN(this.hintPenalty) || this.hintPenalty < 0 || this.hintPenalty > this.maxHintPenalty) {
      errorMessage += 'Hint penalty must be a number in range from 0 to ' + this.maxHintPenalty + '\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }

}
