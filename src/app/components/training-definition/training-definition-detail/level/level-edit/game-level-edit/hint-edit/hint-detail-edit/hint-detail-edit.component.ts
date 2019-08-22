import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Hint} from "../../../../../../../../model/level/hint";
import {AlertTypeEnum} from "../../../../../../../../model/enums/alert-type.enum";
import {AlertService} from "../../../../../../../../services/shared/alert.service";
import {BaseComponent} from "../../../../../../../base.component";
import { HintConfigurationFormGroup } from './hint-configuration-form-group';
import { Validators } from '@angular/forms';

@Component({
  selector: 'hint-edit',
  templateUrl: './hint-detail-edit.component.html',
  styleUrls: ['./hint-detail-edit.component.css']
})
/**
 * Component for configuration of new or existing game level hint
 */
export class HintDetailEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('hint') hint: Hint;
  @Input('levelMaxScore') levelMaxScore: number;
  @Input('initHintPenaltySum') initHintPenaltySum: number;
  @Input('order') order: number;
  @Input('disabled') disabled: boolean;

  @Output('hint') hintChange = new EventEmitter();
  @Output('penaltyChange') penaltyChange = new EventEmitter<number>();
  @Output('validity') validityChange = new EventEmitter();
  @Output('deleteHint') deleteHint = new EventEmitter<Hint>();
  
  maxHintPenalty: number;
  valid: boolean;
  hintConfigurationFormGroup: HintConfigurationFormGroup;
  constructor(private alertService: AlertService) {
    super();
  }

  ngOnInit() {}

  get title() {return this.hintConfigurationFormGroup.formGroup.get('title')};
  get content() {return this.hintConfigurationFormGroup.formGroup.get('content')};
  get hintPenalty() {return this.hintConfigurationFormGroup.formGroup.get('hintPenalty')};

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.hintConfigurationFormGroup) {
      this.hintConfigurationFormGroup = new HintConfigurationFormGroup();
    }
    if ("hint" in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.hintConfigurationFormGroup.formGroup.dirty;
  }

  /**
   * Validates user input, sets input values to hint object and saves hints through REST API
   */
  saveChanges() {
    if (this.hintConfigurationFormGroup.formGroup.valid) {
      this.setInputValuesToHint();
      this.hintConfigurationFormGroup.formGroup.markAsPristine();
    }
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
    this.maxHintPenalty =
      this.levelMaxScore - (hintsPenaltySum - this.hintPenalty.value);
  }

  /**
   * Emits event to delete this hint
   */
  onDeleteHint() {
    this.deleteHint.emit(this.hint);
  }

  hintChanged() {
    this.hintConfigurationFormGroup.formGroup.markAsDirty();
    this.hintChange.emit(this.hint);
    this.updateValidity();
  }

  setContentValue(event){
    this.content.setValue(event);
  }

  /**
   * Sets initial values from hint object to inputs (edit mode)
   */
  private setInitialValues() {
    this.title.setValue(this.hint.title);
    this.content.setValue(this.hint.content);
    this.hintPenalty.setValue(this.hint.hintPenalty);
    this.calculateInitialMaxHintPenalty();
    this.updateValidity();
  }

  /**
   * Sets values from user input values to hint object
   */
  private setInputValuesToHint() {
    this.hint.title = this.title.value;
    this.hint.content = this.content.value;
    this.hint.hintPenalty = this.hintPenalty.value;
  }

  private calculateInitialMaxHintPenalty() {
    this.maxHintPenalty =
      this.levelMaxScore - (this.initHintPenaltySum - this.hintPenalty.value);
    this.hintPenalty.setValidators([Validators.required, Validators.min(0), Validators.max(this.maxHintPenalty)]);
  }

  updateValidity() {
    this.valid = this.hintConfigurationFormGroup.formGroup.valid;
    this.validityChange.emit();
  }

  /**
   * Enables/disables title and hintPenalty form field based on disabled input
   */
  checkState() {
    if (this.disabled) {
      this.title.disable();
      this.hintPenalty.disable();
    } else {
      this.title.enable();
      this.hintPenalty.enable();
    }
    this.hintConfigurationFormGroup.formGroup.updateValueAndValidity();
  }
}
