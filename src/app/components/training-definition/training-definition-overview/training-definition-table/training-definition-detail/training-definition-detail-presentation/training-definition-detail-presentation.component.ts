import {Component, Input, OnInit} from '@angular/core';
import {TrainingDefinition} from '../../../../../../model/training/training-definition';

@Component({
  selector: 'kypo2-training-definition-detail-presentation',
  templateUrl: './training-definition-detail-presentation.component.html',
  styleUrls: ['./training-definition-detail-presentation.component.css']
})
export class TrainingDefinitionDetailPresentationComponent implements OnInit {

  @Input() trainingDefinition: TrainingDefinition;

  constructor() { }

  ngOnInit() {
  }

}
