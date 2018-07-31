import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";
import {GameLevel} from "../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {AssessmentTypeEnum} from "../../../../enums/assessment-type.enum";

@Component({
  selector: 'training-level-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.css']
})
export class TrainingLevelStepperComponent implements OnInit, OnChanges {

  @Input('isTrainingSaved') isTrainingSaved: boolean;
  @Input('trainingDefinitionId') trainingDefinitionId: number;
  @Input('levels') levels: AbstractLevel[];

  selectedStep: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('levels' in changes) {
      this.resolveInitialLevels();
    }
  }

  addInfoLevel() {
    this.levels.push(new InfoLevel(this.trainingDefinitionId,
      "New Info Level",
      0,
      this.levels.length,
      '',
      '',
      ''));
  }

  addGameLevel() {
    this.levels.push(new GameLevel(this.trainingDefinitionId,
      "New Game Level",
      0,
      this.levels.length,
      '',
      '',
      '',
      [],
      '',
      '',
      0,
      0)
      );
  }

  addAssessmentLevel() {
    this.levels.push(new AssessmentLevel(this.trainingDefinitionId,
      "New Assessment Level",
      0,
      this.levels.length,
      '',
      '',
      null,
      AssessmentTypeEnum.Questionnaire)
    );
  }

  swapLeft() {
    console.log(this.levels);
    if (this.selectedStep !== 0) {
      const tempLevel = this.levels[this.selectedStep - 1];
      tempLevel.order += 1;

      this.levels[this.selectedStep].order -= 1;
      this.levels[this.selectedStep - 1] = this.levels[this.selectedStep];
      this.levels[this.selectedStep] = tempLevel;
      this.selectedStep -= 1;
      // TODO: save edited order in db
    }
  }

  swapRight() {
    console.log(this.levels);
    if (this.selectedStep !== this.levels.length - 1) {
      const tempLevel = this.levels[this.selectedStep + 1];
      tempLevel.order -= 1;

      this.levels[this.selectedStep].order += 1;
      this.levels[this.selectedStep + 1] = this.levels[this.selectedStep];
      this.levels[this.selectedStep] = tempLevel;
      this.selectedStep += 1;
      // TODO: save edited order in db
    }
  }

  selectionChanged(event) {
    this.selectedStep = event.selectedIndex;
  }

  private resolveInitialLevels() {
    if (!this.levels) {
      this.levels = [];
    }
  }
}


