import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { MatButton } from '@angular/material';
import {BaseComponent} from '../../../base.component';
import { TraineeAccessTrainingFormGroup } from './trainee-access-training-form-group';

@Component({
  selector: 'kypo2-access-training-run',
  templateUrl: './access-training-run.component.html',
  styleUrls: ['./access-training-run.component.css']
})
/**
 * Components for trainee access to training run by inserting token
 */
export class AccessTrainingRunComponent extends BaseComponent implements OnInit {

  @ViewChild('pin', {static: false}) accessTokenPinInput: ElementRef;
  @ViewChild('accessButton', {static: false}) accessButton: MatButton;

  @Output() accessToken: EventEmitter<string> = new EventEmitter<string>();

  traineeAccessTrainingFormGroup: TraineeAccessTrainingFormGroup;

  ngOnInit() {
    this.traineeAccessTrainingFormGroup = new TraineeAccessTrainingFormGroup();
  }

  get accessTokenPrefix() {return this.traineeAccessTrainingFormGroup.formGroup.get('accessTokenPrefix'); }
  get accessTokenPin() {return this.traineeAccessTrainingFormGroup.formGroup.get('accessTokenPin'); }

  access() {
    const accessToken = this.accessTokenPrefix.value + '-' + this.accessTokenPin.value;
    this.accessToken.emit(accessToken);
  }

  onPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData.getData('text');
    if (pastedText.includes('-')) {
      event.preventDefault();
      this.accessTokenPrefix.setValue(pastedText.slice(0, pastedText.indexOf('-')).trim());
      this.accessTokenPin.setValue(pastedText.slice(pastedText.indexOf('-') + 1, pastedText.length).trim());
      this.traineeAccessTrainingFormGroup.formGroup.updateValueAndValidity();
      this.accessTokenPin.markAsTouched();
      this.accessTokenPrefix.markAsTouched();
      setTimeout(() => this.accessButton.focus());
    }
  }

  onKeyup(event) {
    if (event.key === '-') {
      this.accessTokenPinInput.nativeElement.focus();
      this.accessTokenPrefix.setValue(this.accessTokenPrefix.value.slice(0, -1));
    }
  }

}
