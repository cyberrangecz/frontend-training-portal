import { Component, OnInit } from '@angular/core';
import { GAME_INFORMATION } from '../../../shared/mocks/information.mock';
import { EVENTS } from '../../../shared/mocks/events.mock';

@Component({
  selector: 'training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css']
})
/**
 * Component displaying various visualization of training run results
 */
export class TrainingRunResultsComponent implements OnInit {

  mockFeedbackLearnerId;
  mockGameData;

  constructor() { }

  ngOnInit() {
    this.mockFeedbackLearnerId = 9003575;
    this.mockGameData = {information: GAME_INFORMATION, events: EVENTS};
  }

}
