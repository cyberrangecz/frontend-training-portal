import { TrainingDefinitionTableRow } from '../../../../model/table-adapters/training-definition-table-row';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'kypo2-training-definition-detail',
  templateUrl: './training-definition-detail.component.html',
  styleUrls: ['./training-definition-detail.component.scss']
})
/**
 * Detail of training definition. Loads info about levels
 */
export class TrainingDefinitionDetailComponent implements OnInit {

  @Input() data: TrainingDefinitionTableRow;


  ngOnInit() {
  }

}
