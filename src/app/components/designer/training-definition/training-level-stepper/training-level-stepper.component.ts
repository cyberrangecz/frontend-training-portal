import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";
import {GameLevel} from "../../../../model/level/game-level";
import {AssessmentLevel} from "../../../../model/level/assessment-level";
import {AssessmentTypeEnum} from "../../../../enums/assessment-type.enum";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'training-level-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.css']
})
export class TrainingLevelStepperComponent implements OnInit, OnChanges {

  @Input('trainingDefinitionId') trainingDefinitionId: number;
  @Input('levels') levels: AbstractLevel[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('levels' in changes) {
      this.resolveInitialLevels();
    }
  }

  private resolveInitialLevels() {
    if (!this.levels) {
      this.levels = [];
    }
  }

  addInfoLevel() {
    this.levels.push(new InfoLevel(this.trainingDefinitionId,
      "New Info Level",
      0,
      this.levels.length,
      new Blob(),
      new Blob(),
      new Blob));
  }

  addGameLevel() {
    this.levels.push(new GameLevel(this.trainingDefinitionId,
      "New Game Level",
      0,
      this.levels.length,
      new Blob(),
      new Blob(),
      '',
      [],
      new Blob(),
      new Blob(),
      0,
      0)
      );
  }

  addAssessmentLevel() {
    this.levels.push(new AssessmentLevel(this.trainingDefinitionId,
      "New Assessment Level",
      0,
      this.levels.length,
      new Blob(),
      new Blob(),
      null,
      AssessmentTypeEnum.Questionnaire)
    );
  }

  navigateTo(event) {
    this.router.navigate(['', {outlets: {'level': [event.selectedIndex]}}], {relativeTo: this.activatedRoute});
  }
}


