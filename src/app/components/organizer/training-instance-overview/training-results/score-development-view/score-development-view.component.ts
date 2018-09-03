import { Component, OnInit } from '@angular/core';
import { GAME_INFORMATION } from '../../../../shared/mocks/information.mock';
import { EVENTS } from '../../../../shared/mocks/events.mock';

@Component({
  selector: 'score-development-view',
  templateUrl: './score-development-view.component.html',
  styleUrls: ['./score-development-view.component.css']
})
export class ScoreDevelopmentViewComponent implements OnInit {

  mockFeedbackLearnerId: number;
  mockGameData;


  constructor() { }

  ngOnInit() {
    this.mockFeedbackLearnerId = 9003575;
    this.mockGameData = {information: GAME_INFORMATION, events: EVENTS};
  }

}
