import {Component, Input, OnInit} from '@angular/core';
import {GameLevel} from "../../../../../model/level/game-level";

@Component({
  selector: 'training-run-game-level',
  templateUrl: './training-run-game-level.component.html',
  styleUrls: ['./training-run-game-level.component.css']
})
export class TrainingRunGameLevelComponent implements OnInit {

  @Input('level') level: GameLevel;

  constructor() { }

  ngOnInit() {
  }

}
