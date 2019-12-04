import { TrainingDefinitionTableRow } from '../../../../model/table/row/training-definition-table-row';
import { BaseComponent } from './../../../base.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TableActionEvent } from 'kypo2-table';

@Component({
  selector: 'kypo2-training-definition-actions-panel',
  templateUrl: './training-definition-actions-panel.component.html',
  styleUrls: ['./training-definition-actions-panel.component.scss']
})
export class TrainingDefinitionActionsPanelComponent extends BaseComponent implements OnInit {

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
