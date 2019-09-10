import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'kypo2-level-controls',
  templateUrl: './level-controls.component.html',
  styleUrls: ['./level-controls.component.css']
})
export class LevelControlsComponent implements OnInit {

  @Input() isWaitingOnServerResponse: boolean;
  @Input() isLoading: boolean;

  @Output() gameLevelAdded: EventEmitter<boolean> = new EventEmitter();
  @Output() assessmentLevelAdded: EventEmitter<boolean> = new EventEmitter();
  @Output() infoLevelAdded: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  addGameLevel() {
    this.gameLevelAdded.emit();
  }
  addAssessmentLevel() {
    this.assessmentLevelAdded.emit();
  }
  addInfoLevel() {
    this.infoLevelAdded.emit();
  }
}
