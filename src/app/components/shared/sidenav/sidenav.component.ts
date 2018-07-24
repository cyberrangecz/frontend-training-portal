import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveUserService} from "../../../services/active-user.service";

@Component({
  selector: 'shared-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
/**
 * Component of sidebar navigation. Changes dynamically based on roles of a user
 */
export class SidenavComponent implements OnInit, OnDestroy {

  private trainings;
  activeTrainings;

  userChangeSubscription;

  constructor(private activeUserService: ActiveUserService) {

  }

  ngOnInit() {
    this.createTrainings();
    this.setActiveTrainings();
    this.subscribeUserChange();
  }

  ngOnDestroy() {
    if(this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }

  /**
   * Creates source objects for training navigation links
   */
  private createTrainings() {
    this.trainings = [
      {
        title: 'Designer',
        visible: this.activeUserService.isDesigner(),
        route: '/designer'
      },
      {
        title: 'Organizer',
        visible: this.activeUserService.isOrganizer(),
        route: '/organizer'
      },
      {
        title: 'Trainee',
        visible: this.activeUserService.isTrainee(),
        route: '/trainee'
      }
    ];
  }

  /**
   * Sets active trainings based on visibility of training objects
   */
  private setActiveTrainings() {
    this.activeTrainings = this.trainings.filter(training => training.visible);
  }

  /**
   * Subscribes for changes of active (logged in) user and in case of changes recalculates visibility of trainings based on his roles.
   */
  private subscribeUserChange() {
    this.userChangeSubscription = this.activeUserService.onActiveUserChanged
      .subscribe(id => {
        this.createTrainings();
        this.setActiveTrainings();
      })
  }
}
