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
import {Validators} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {Hint} from 'kypo-training-model';
import {KypoBaseComponent} from 'kypo-common';
import {HintEditFormGroup} from './hint-edit-form-group';

@Component({
  selector: 'kypo2-hint-edit',
  templateUrl: './hint-detail-edit.component.html',
  styleUrls: ['./hint-detail-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component to edit new or existing game level hint
 */
export class HintDetailEditComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() hint: Hint;
  @Input() levelMaxScore: number;
  @Input() hintsPenaltySum: number;
  @Input() order: number;
  @Output() hintChange: EventEmitter<Hint> = new EventEmitter();

  maxHintPenalty: number;
  hintConfigurationFormGroup: HintEditFormGroup;

  constructor() {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.hintConfigurationFormGroup.formGroup.get('title');
  }
  get content() {
    return this.hintConfigurationFormGroup.formGroup.get('content');
  }
  get hintPenalty() {
    return this.hintConfigurationFormGroup.formGroup.get('hintPenalty');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('hint' in changes) {
      this.hintConfigurationFormGroup = new HintEditFormGroup(this.hint);
      this.calculateMaxPenalty();
      this.subscribeFormChanges();
    }
    if ('hintsPenaltySum' in changes || 'levelMaxScore' in changes) {
      this.calculateMaxPenalty();
    }
  }

  /**
   * Changes internal component state and emits event on hint change
   */
  onHintChanged() {
    this.hintConfigurationFormGroup.formGroup.markAsDirty();
    this.hintConfigurationFormGroup.setToHint(this.hint);
    this.hintChange.emit(this.hint);
  }

  private subscribeFormChanges() {
    this.hintConfigurationFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.onHintChanged());
  }

  private calculateMaxPenalty() {
    this.maxHintPenalty = this.levelMaxScore - (this.hintsPenaltySum - this.hint.penalty);
    this.hintPenalty.setValidators([Validators.required, Validators.min(0), Validators.max(this.maxHintPenalty)]);
  }

}
