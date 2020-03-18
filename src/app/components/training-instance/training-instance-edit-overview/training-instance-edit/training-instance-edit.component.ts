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
import {MatDialog} from '@angular/material/dialog';
import {interval} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {TrainingInstanceChangeEvent} from '../../../../model/events/training-instance-change-event';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {KypoBaseComponent} from 'kypo-common';
import {TrainingDefinitionSelectComponent} from '../training-definition-select/training-definition-select.component';
import {TrainingInstanceFormGroup} from './training-instance-form-group';

/**
 * Component for creating new or editing existing training instance
 */
@Component({
  selector: 'kypo2-training-instance-edit',
  templateUrl: './training-instance-edit.component.html',
  styleUrls: ['./training-instance-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceEditComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() trainingInstance: TrainingInstance;
  @Output() edited: EventEmitter<TrainingInstanceChangeEvent> = new EventEmitter();

  now: Date;
  trainingInstanceFormGroup: TrainingInstanceFormGroup;
  userChangedStartTime = false;
  period = 60000;

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.initCurrentTimePeriodicalUpdate();
  }

  get startTime() {
    return this.trainingInstanceFormGroup.formGroup.get('startTime');
  }
  get endTime() {
    return this.trainingInstanceFormGroup.formGroup.get('endTime');
  }
  get title() {
    return this.trainingInstanceFormGroup.formGroup.get('title');
  }
  get trainingDefinition() {
    return this.trainingInstanceFormGroup.formGroup.get('trainingDefinition');
  }
  get accessToken() {
    return this.trainingInstanceFormGroup.formGroup.get('accessToken');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.trainingInstanceFormGroup = new TrainingInstanceFormGroup(this.trainingInstance);
      this.setUpPeriodicTimeStartTimeUpdate();
      this.setupOnFormChangedEvent();
    }
  }

  /**
   * Opens popup dialog to choose a training definition to associate with edited training instance
   */
  selectTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingDefinitionSelectComponent, { data: this.trainingDefinition.value });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingInstanceFormGroup.formGroup.markAsDirty();
        this.trainingDefinition.setValue(result.trainingDef);
      }
    });
  }

  /**
   * Changes internal component state to prevent from from recalculating start time if user already set the value
   */
  onStartTimeChanged() {
    this.userChangedStartTime = true;
  }

  private setUpPeriodicTimeStartTimeUpdate() {
    interval(this.period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
      if (!this.userChangedStartTime) {
        this.startTime.setValue(new Date(this.startTime.value.setMinutes(this.startTime.value.getMinutes() + 1)));
      }
    });
  }

  private initCurrentTimePeriodicalUpdate() {
    this.now = new Date();
    interval(this.period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(value =>
      this.now = new Date()
    );
  }

  private setupOnFormChangedEvent() {
    this.trainingInstanceFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(_ => this.onChanged());
  }

  private onChanged() {
    this.trainingInstanceFormGroup.setValuesToTrainingInstance(this.trainingInstance);
    this.edited.emit(new TrainingInstanceChangeEvent(
      this.trainingInstance,
      this.trainingInstanceFormGroup.formGroup.valid)
    );
  }
}
