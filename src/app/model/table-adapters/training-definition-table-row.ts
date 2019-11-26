import { TrainingDefinitionStateEnum } from '../enums/training-definition-state.enum';
import { TrainingDefinition } from '../training/training-definition';
import { TableRowAdapter } from './table-row-adapter';
import { formatDate } from '@angular/common';
import { AbstractLevel } from '../level/abstract-level';

export class TrainingDefinitionTableRow implements TableRowAdapter {

  id: number;
  title: string;
  state: TrainingDefinitionStateEnum;
  estimatedDuration: number;
  lastEditTime: string;
  description: string;
  levels: AbstractLevel[];
  outcomes: string[];
  prerequisites: string[];
  sandboxDefinitionId: number;
  showStepperBar: boolean;

  constructor(trainingDefinition: TrainingDefinition) {
    this.id = trainingDefinition.id;
    this.title = trainingDefinition.title;
    this.state = trainingDefinition.state;
    this.estimatedDuration = trainingDefinition.estimatedDuration;
    this.lastEditTime = formatDate(trainingDefinition.lastEditTime, 'd MMM yyyy H:mm', 'en-US');
    this.description = trainingDefinition.description;
    this.levels = trainingDefinition.levels;
    this.outcomes = trainingDefinition.outcomes;
    this.prerequisites = trainingDefinition.prerequisites;
    this.sandboxDefinitionId = trainingDefinition.sandboxDefinitionId;
    this.showStepperBar = trainingDefinition.showStepperBar;

  }
}
