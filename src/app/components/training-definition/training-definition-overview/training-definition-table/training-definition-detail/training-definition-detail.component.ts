import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../../model/training/training-definition';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-detail.component.html',
  styleUrls: ['./training-definition-detail.component.css']
})
/**
 * Detail of training definition. Loads info about levels
 */
export class TrainingDefinitionDetailComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() trainingDefinition: TrainingDefinition;


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
