import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveUserService} from "../../../services/active-user.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  private trainings;
  activeTrainings;

  userChangeSubscription;

  constructor(private activeUserService: ActiveUserService) {
    this.createTrainings();
    this.setActiveTrainings();
    this.subscribeUserChange();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }

  private createTrainings() {
    this.trainings = [
      {
        title: 'Designer',
        visible: this.activeUserService.isDesigner(),
        route: '/designer'
      },
      {
        title: 'Organizer',
        visible: this.activeUserService.isDesigner(),
        route: '/organizer'
      },
      {
        title: 'Trainee',
        visible: this.activeUserService.isTrainee(),
        route: '/trainee'
      }
    ];
  }

  private setActiveTrainings() {
    this.activeTrainings = this.trainings.filter(training => training.visible);
  }

  private subscribeUserChange() {
    this.userChangeSubscription = this.activeUserService.onActiveUserChanged
      .subscribe(id => {
        this.createTrainings();
        this.setActiveTrainings();
      })
  }
}
