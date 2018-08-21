import { Component, OnInit } from '@angular/core';
import { GAME_INFORMATION } from '../../../../shared/mocks/information.mock';
import { EVENTS } from '../../../../shared/mocks/events.mock';

@Component({
  selector: 'score-scatter-plot-view',
  templateUrl: './score-scatter-plot-view.component.html',
  styleUrls: ['./score-scatter-plot-view.component.css']
})
export class ScoreScatterPlotViewComponent implements OnInit {

  mockFeedbackLearnerId = 9003575;
  mockGameData = {information: GAME_INFORMATION, events: EVENTS};

  constructor() { }

  ngOnInit() {
  }

}
