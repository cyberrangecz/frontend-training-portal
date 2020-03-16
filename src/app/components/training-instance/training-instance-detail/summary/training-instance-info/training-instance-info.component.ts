import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {KypoBaseComponent} from 'kypo-common';
import {RouteFactory} from '../../../../../model/routes/route-factory';

/**
 * Component for displaying basic info about selected training instance.
 */
@Component({
  selector: 'kypo2-training-instance-info',
  templateUrl: './training-instance-info.component.html',
  styleUrls: ['./training-instance-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceInfoComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() trainingInstance: TrainingInstance;
  trainingDefinition: TrainingDefinition;
  accessTokenLink: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes && this.trainingInstance) {
      this.trainingDefinition = this.trainingInstance.trainingDefinition;
      this.accessTokenLink = `/${RouteFactory.toTrainingInstanceAccessToken(this.trainingInstance.id)}`;
    }
  }
}
