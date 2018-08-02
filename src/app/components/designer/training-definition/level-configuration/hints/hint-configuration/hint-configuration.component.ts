import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Hint} from "../../../../../../model/level/hint";
import {AlertTypeEnum} from "../../../../../../enums/alert-type.enum";
import {AlertService} from "../../../../../../services/event-services/alert.service";

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
  @Input('order') order: number;
  @Output('hint') hintChange = new EventEmitter();

  title: string;
  content: string;
  hintPenalty: number;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('hint' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Validates user input, sets input values to hint object and saves hints through REST API
   */
  saveChanges() {
    if (this.validateInput()) {
      this.setInputValuesToHint();
      this.hintChanged();
      // TODO: save through rest api
    }
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
  }

  /**
   * Sets values from user input values to hint object
   */
  private setInputValuesToHint() {
    this.hint.title = this.title;
    this.hint.content = this.content;
    this.hint.hintPenalty = this.hintPenalty;
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

    if (!this.hintPenalty || this.hintPenalty < 0 || this.hintPenalty > 50) {
      errorMessage += 'Hint penalty must be a number in range from 0 to 50\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorTitle + errorMessage);
      return false;
    }
    return true;
  }

}
