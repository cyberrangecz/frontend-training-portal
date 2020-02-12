import {BaseComponent} from '../../../base.component';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * Components containing controls for training definition overview
 */
@Component({
  selector: 'kypo2-training-definition-controls',
  templateUrl: './training-definition-overview-controls.component.html',
  styleUrls: ['./training-definition-overview-controls.component.scss']
})
export class TrainingDefinitionOverviewControlsComponent extends BaseComponent implements OnInit {

  @Output() action = new EventEmitter<'create' | 'upload'>();

  constructor() { super(); }

  ngOnInit() {
  }

  /**
   * Emits event to create training definition
   */
  createTrainingDefinition() {
    this.action.emit('create');
  }

  /**
   * Emits event to upload training definition
   */
  uploadTrainingDefinition() {
    this.action.emit('upload');
  }

}
