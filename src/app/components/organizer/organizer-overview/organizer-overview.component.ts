import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingInstancesTableComponent} from "./training-instance-table/training-instances-table.component";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'organizer-overview',
  templateUrl: './organizer-overview.component.html',
  styleUrls: ['./organizer-overview.component.css']
})
/**
 * Main component of organizer overview. Wrapper for child components (definition of new training instance and overivew of  existing training instances)
 */
export class OrganizerOverviewComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild(TrainingInstancesTableComponent, { static: true }) trainingInstancesListComponent: TrainingInstancesTableComponent;

  ngOnInit() {
  }

  refreshTrainingInstanceOverview() {
    this.trainingInstancesListComponent.refreshData();
  }

}
