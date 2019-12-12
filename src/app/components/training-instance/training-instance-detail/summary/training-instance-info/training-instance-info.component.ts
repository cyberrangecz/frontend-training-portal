import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {BaseComponent} from '../../../../base.component';
import {RouteFactory} from '../../../../../model/routes/route-factory';
import {Router} from '@angular/router';

@Component({
  selector: 'kypo2-training-instance-info',
  templateUrl: './training-instance-info.component.html',
  styleUrls: ['./training-instance-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Displays info about selected training instance.
 */
export class TrainingInstanceInfoComponent extends BaseComponent implements OnInit, OnChanges {

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
