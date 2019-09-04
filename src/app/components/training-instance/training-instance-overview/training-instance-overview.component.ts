import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingInstanceTableComponent} from './training-instance-table/training-instance-table.component';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css']
})
/**
 * Main component of organizer overview. Wrapper for child components (definition of new training instance and overivew of  existing training instances)
 */
export class TrainingInstanceOverviewComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild(TrainingInstanceTableComponent, { static: true }) trainingInstancesListComponent: TrainingInstanceTableComponent;

  ngOnInit() {
  }

  refreshTrainingInstanceOverview() {
    this.trainingInstancesListComponent.refreshData();
  }

}
