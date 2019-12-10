import { BaseComponent } from '../../../base.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kypo2-training-definition-controls',
  templateUrl: './training-definition-overview-controls.component.html',
  styleUrls: ['./training-definition-overview-controls.component.scss']
})
export class TrainingDefinitionOverviewControlsComponent extends BaseComponent implements OnInit {

  @Output() action = new EventEmitter<string>();

  constructor() { super(); }

  ngOnInit() {
  }

  createTrainingDefinition() {
    this.action.emit('create');
  }

  uploadTrainingDefinition() {
    this.action.emit('upload');
  }

}
