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
import {takeWhile} from 'rxjs/operators';
import {AssessmentLevel} from '../../../../../../model/level/assessment-level';
import {Question} from '../../../../../../model/questions/question';
import {KypoBaseComponent} from 'kypo-common';
import {AssessmentLevelEditFormGroup} from './assessment-level-edit-form-group';

/**
 * Component for editing new or existing assessment level
 */
@Component({
  selector: 'kypo2-assessment-level-configuration',
  templateUrl: './assessment-level-edit.component.html',
  styleUrls: ['./assessment-level-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentLevelEditComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() level: AssessmentLevel;
  @Output() levelChange: EventEmitter<AssessmentLevel> = new EventEmitter();
  assessmentFormGroup: AssessmentLevelEditFormGroup;

  ngOnInit() {
  }

  get title() {
    return this.assessmentFormGroup.formGroup.get('title');
  }
  get instructions() {
    return this.assessmentFormGroup.formGroup.get('instructions');
  }
  get isTest() {
    return this.assessmentFormGroup.formGroup.get('isTest');
  }
  get estimatedDuration() {
    return this.assessmentFormGroup.formGroup.get('estimatedDuration');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.assessmentFormGroup = new AssessmentLevelEditFormGroup(this.level);
      this.assessmentFormGroup.formGroup.valueChanges
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe(_ => {
        this.assessmentFormGroup.setToLevel(this.level);
        this.levelChange.emit(this.level);
      });
    }
  }

  /**
   * Changes internal state of the component and emits change event to parent component
   * @param questions new state of changed questions
   */
  onQuestionsChanged(questions: Question[]) {
    this.level.questions = questions;
    this.assessmentFormGroup.setToLevel(this.level);
    this.levelChange.emit(this.level);
  }
}
