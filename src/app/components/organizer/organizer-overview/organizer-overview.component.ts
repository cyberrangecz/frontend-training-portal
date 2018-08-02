import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingInstancesListComponent} from "./training-instance-overview/training-instances-list.component";

@Component({
  selector: 'organizer-overview',
  templateUrl: './organizer-overview.component.html',
  styleUrls: ['./organizer-overview.component.css']
})
/**
 * Main component of organizer overview. Wrapper for child components (definition of new training instance and overivew of  existing training instances)
 */
export class OrganizerOverviewComponent implements OnInit {

  @ViewChild(TrainingInstancesListComponent) trainingInstancesListComponent: TrainingInstancesListComponent;

  constructor() { }

  ngOnInit() {
  }

  refreshTrainingInstanceOverview() {
    this.trainingInstancesListComponent.refreshData();
  }

}
