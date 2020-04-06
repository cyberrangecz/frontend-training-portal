import {Component, Input, OnInit} from '@angular/core';
import {TrainingDefinition} from 'kypo-training-model';

@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-detail.component.html',
  styleUrls: ['./training-definition-detail.component.scss']
})
/**
 * Detail of training definition for overview table component. Displays detailed information about training definition
 */
export class TrainingDefinitionDetailComponent implements OnInit {

  @Input() data: TrainingDefinition;

  ngOnInit() {
  }

}
