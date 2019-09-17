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
import {HintConfigurationFormGroup} from './hint-configuration-form-group';
import {Validators} from '@angular/forms';
import {BaseComponent} from '../../../../../../base.component';
import {Hint} from '../../../../../../../model/level/hint';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'kypo2-hint-edit',
  templateUrl: './hint-detail-edit.component.html',
  styleUrls: ['./hint-detail-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component for configuration of new or existing game level hint
 */
export class HintDetailEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() hint: Hint;
  @Input() levelMaxScore: number;
  @Input() hintsPenaltySum: number;
  @Input() order: number;
  @Output() hintChange: EventEmitter<Hint> = new EventEmitter();

  maxHintPenalty: number;
  hintConfigurationFormGroup: HintConfigurationFormGroup;

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
      this.hintConfigurationFormGroup = new HintConfigurationFormGroup(this.hint);
      this.calculateMaxPenalty();
      this.subscribeFormChanges();
    }
    if ('hintsPenaltySum' in changes || 'levelMaxScore' in changes) {
      this.calculateMaxPenalty();
    }
  }

  hintChanged() {
    this.hintConfigurationFormGroup.formGroup.markAsDirty();
    this.hintConfigurationFormGroup.setToHint(this.hint);
    this.hintChange.emit(this.hint);
  }

  private subscribeFormChanges() {
    this.hintConfigurationFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.hintChanged());
  }

  private calculateMaxPenalty() {
    this.maxHintPenalty = this.levelMaxScore - (this.hintsPenaltySum - this.hint.penalty);
    this.hintPenalty.setValidators([Validators.required, Validators.min(0), Validators.max(this.maxHintPenalty)]);
  }

}
