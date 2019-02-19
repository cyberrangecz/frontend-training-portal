import { Component, OnInit } from '@angular/core';
import { GAME_INFORMATION } from '../../../../shared/mocks/information.mock';
import { EVENTS } from '../../../../shared/mocks/events.mock';

@Component({
  selector: 'combined-view',
  templateUrl: './combined-view.component.html',
  styleUrls: ['./combined-view.component.css']
})
export class CombinedViewComponent implements OnInit {

  mockFeedbackLearnerId = 9003575;
  mockGameData = {information: GAME_INFORMATION, events: EVENTS};

  constructor() { }

  ngOnInit() {
  }

}
