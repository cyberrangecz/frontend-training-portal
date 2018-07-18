import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";

@Component({
  selector: 'training-configuration',
  templateUrl: './training-configuration.component.html',
  styleUrls: ['./training-configuration.component.css']
})
export class TrainingConfigurationComponent implements OnInit, OnChanges {

  @Input('trainingDefinition') trainingDefinition: TrainingDefinition;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
      this.resolveInputTraining();
    }
  }

  private resolveInputTraining() {
    if (!this.trainingDefinition) {
      this.trainingDefinition = new TrainingDefinition(
        null,
        [],
        TrainingDefinitionStateEnum.Unreleased,
        []
      );
      this.trainingDefinition.title = 'New Training Definition'
    }
  }

}
