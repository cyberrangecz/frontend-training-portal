import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
} from '@angular/core';
import {AbstractLevel} from '../../../../model/level/abstract-level';
import { MatDialog } from '@angular/material/dialog';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {BaseComponent} from '../../../base.component';
import {StepperInterface} from 'kypo2-stepper';

@Component({
  selector: 'kypo2-levels-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.css']
})
/**
 * Component of training level stepper which is used to create new or edit existing levels in training definition.
 */
export class TrainingLevelStepperComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() trainingDefinition: TrainingDefinition;
  @Input() items: AbstractLevel[];
  @Input() activeStep: number;
  @Output() activeLevelChanged: EventEmitter<number> = new EventEmitter();
  @Output() activeLevelSwap: EventEmitter<number> = new EventEmitter();
  @Output() onLevelDelete: EventEmitter<number> = new EventEmitter();
  @Output() onLevelSwap: EventEmitter<object> = new EventEmitter();
  @Output() initialLevels: EventEmitter<AbstractLevel[]> = new EventEmitter();

  isLoading = true;
  isStepperUpdating = false;
  isWaitingOnServerResponse = true;
  selectedStep = 0;

  levels: StepperInterface<AbstractLevel> = {items: [], isLocalChange: true, isLoading: this.isLoading};

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
      if (this.trainingDefinition) {
        this.resolveInitialLevels();
      }
      if (this.activeStep !== null && this.activeStep !== undefined) {
        this.changeSelectedStep(this.activeStep);
      }
    }
    if ('activeStep' in changes && this.activeStep >= 0 && !('trainingDefinition' in changes)) {
      this.selectionChanged(this.activeStep);
    }
    if ('items' in changes) {
      this.levels.items = this.items;
      this.isStepperUpdating = false;
    }
  }

  /**
   * Deletes level on given index
   * @param {number} toDeleteId index of level which should be deleted
   */
  onDeleteLevel(toDeleteId: number) {
    this.onLevelDelete.emit(toDeleteId);
  }

  selectionChanged(event) {
    this.changeSelectedStep(event);
    this.activeLevelChanged.emit(this.levels.items[event].id);
  }

  private changeSelectedStep(index: number) {
    if (this.levels.items[this.selectedStep]) {
      this.levels.items[this.selectedStep].isActive = false;
    }
    if (this.levels.items[index]) {
      this.levels.items[index].isActive = true;
    }
    this.selectedStep = index;
  }

  private setInitialLevelsState(levels: AbstractLevel[]): AbstractLevel[] {
    levels.forEach(level => level.isSaved = true);
    return levels;
  }

  private resolveInitialLevels() {
    if (this.trainingDefinition.levels && this.trainingDefinition.levels.length > 0) {
      this.trainingDefinition.levels = this.setInitialLevelsState(this.trainingDefinition.levels);
      this.levels.items = this.trainingDefinition.levels;
    } else {
      this.levels.items = [];
    }
    this.initialLevels.emit(this.levels.items);
    this.isLoading = false;
    this.isWaitingOnServerResponse = false;
  }

  swapLevels(event) {
    this.isStepperUpdating = true;
    this.onLevelSwap.emit({indexes: event, trainingDefinitionId: this.trainingDefinition.id, levels: this.levels.items});
  }
}
