import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LevelMoveEvent} from '../../../../../model/events/level-move-event';
import {Level} from '../../../../../model/level/level';
import {BaseComponent} from '../../../../base.component';
import {Kypo2Stepper} from 'kypo2-stepper';
import {StepperStateChange} from 'kypo2-stepper/lib/component/stepper-state-change';

/**
 * Stepper component for navigation between training definition levels
 */
@Component({
  selector: 'kypo2-levels-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingLevelStepperComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() levels: Level[];
  @Input() movingInProgress: boolean;
  @Input() activeStep: number;
  @Output() activeStepChange: EventEmitter<number> = new EventEmitter();
  @Output() levelSwap: EventEmitter<LevelMoveEvent> = new EventEmitter();
  @Output() initialLevels: EventEmitter<Level[]> = new EventEmitter();

  levelStepper: Kypo2Stepper<Level> = {items: []};

  private previousActiveStep =  -1;

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

  /**
   * Passes active step change event to parent component
   * @param activeStep index of active (selected) level
   */
  activeStepChanged(activeStep: number) {
    this.activeStepChange.emit(activeStep);
  }

  /**
   * Wraps stepper state change event to level move event and emits it to parent component
   * @param event state of the stepper
   */
  swapLevels(event: StepperStateChange) {
    this.levelSwap.emit(new LevelMoveEvent(event, this.levelStepper.items));
  }

  private changeSelectedStep(index: number) {
    if (this.previousActiveStep >= 0 && this.previousActiveStep < this.levelStepper.items.length) {
      this.levelStepper.items[this.previousActiveStep].isActive = false;
    }
    this.levelStepper.items[index].isActive = true;
    this.previousActiveStep = this.activeStep;
  }
}
