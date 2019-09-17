import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
} from '@angular/core';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import { MatDialog } from '@angular/material/dialog';
import {BaseComponent} from '../../../base.component';
import {StepperInterface} from 'kypo2-stepper';
import {LevelSwapEvent} from '../../../../model/events/level-swap-event';

@Component({
  selector: 'kypo2-levels-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingLevelStepperComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() levels: AbstractLevel[];
  @Input() swappingInProgress: boolean;
  @Input() activeStep: number;
  @Output() activeStepChange: EventEmitter<number> = new EventEmitter();
  @Output() levelSwap: EventEmitter<object> = new EventEmitter();
  @Output() initialLevels: EventEmitter<AbstractLevel[]> = new EventEmitter();

  private previousActiveStep =  -1;
  levelStepper: StepperInterface<AbstractLevel> = {items: [], isLocalChange: true, isLoading: false};

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('levels' in changes) {
      this.levelStepper.items = this.levels;
    }
    if ('activeStep') {
      this.changeSelectedStep(this.activeStep);
    }
  }

  selectionChanged(event) {
    this.activeStepChange.emit(event);
  }

  swapLevels(event) {
    this.levelSwap.emit(new LevelSwapEvent(event, this.levelStepper.items));
  }

  private changeSelectedStep(index: number) {
    if (this.previousActiveStep >= 0 && this.previousActiveStep < this.levelStepper.items.length) {
      this.levelStepper.items[this.previousActiveStep].isActive = false;
    }
    this.levelStepper.items[index].isActive = true;
    this.previousActiveStep = this.activeStep;
  }
}
