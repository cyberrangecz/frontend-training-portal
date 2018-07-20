import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractLevel} from "../../../../model/level/abstract-level";
import {InfoLevel} from "../../../../model/level/info-level";

@Component({
  selector: 'training-level-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.css']
})
export class TrainingLevelStepperComponent implements OnInit, OnChanges {

  @Input('levels') levels: AbstractLevel[];

  constructor() {
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

  addLevel() {
    this.levels.push(new InfoLevel(1, "New Level", 10, 1, new Blob(), new Blob, new Blob));
  }
}


