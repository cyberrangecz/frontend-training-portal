import {Component, Input, OnInit} from '@angular/core';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-training-instance-info',
  templateUrl: './training-instance-info.component.html',
  styleUrls: ['./training-instance-info.component.css']
})
/**
 * Displays info about selected training instance.
 */
export class TrainingInstanceInfoComponent extends BaseComponent implements OnInit {

  @Input() trainingInstance: TrainingInstance;
  @Input() trainingDefinition: TrainingDefinition;
  @Input() accessTokenRouterLink: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
