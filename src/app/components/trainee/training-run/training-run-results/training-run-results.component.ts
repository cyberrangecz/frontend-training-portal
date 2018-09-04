import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { GAME_INFORMATION } from '../../../shared/mocks/information.mock';
import { EVENTS } from '../../../shared/mocks/events.mock';
import {Kypo2TrainingsVisualizationOverviewLibComponent} from "kypo2-trainings-visualization-overview-lib";

@Component({
  selector: 'training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css']
})
/**
 * Component displaying various visualization of training run results
 */
export class TrainingRunResultsComponent implements OnInit, AfterViewInit {

  mockFeedbackLearnerId;
  mockGameData;
  display = false;

  constructor() {
}

  ngOnInit() {
    this.mockFeedbackLearnerId = 9003575;
    this.mockGameData = {information: GAME_INFORMATION, events: EVENTS};
  }

  ngAfterViewInit() {
    // hack because visualization components won't render properly
    // (probably because changing the setting of distraction free mode when leaving last level)
    this.display = true;
  }

}
