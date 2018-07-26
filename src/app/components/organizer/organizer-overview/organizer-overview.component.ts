import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingInstancesListComponent} from "./training-instance-overview/training-instances-list.component";

@Component({
  selector: 'organizer-overview',
  templateUrl: './organizer-overview.component.html',
  styleUrls: ['./organizer-overview.component.css']
})
export class OrganizerOverviewComponent implements OnInit {

  @ViewChild(TrainingInstancesListComponent) trainingInstancesListComponent: TrainingInstancesListComponent;

  constructor() { }

  ngOnInit() {
  }

  refreshTrainingInstanceOverview() {
    this.trainingInstancesListComponent.refreshData();
  }

}
