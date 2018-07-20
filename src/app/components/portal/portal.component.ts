import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveUserService} from "../../services/active-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'overview',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
/**
 * Main component of portal page. Portal page is a main crossroad of possible sub pages. Only those matching with user
 * role are accessible.
 */
export class PortalComponent implements OnInit, OnDestroy {

  trainingRoles;
  cyberExerciseRoles;
  otherAgendaRoles;

  userChangeSubscription;

  constructor(
    private activeUserService: ActiveUserService,
    private router: Router) {
  }

  ngOnInit() {
    this.createTrainingButtons();
    this.createCyberExButtons();
    this.createOtherAgendaButtons();
    this.subscribeUserChange();
  }

  ngOnDestroy() {
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }

  /**
   * Navigates to specified route
   * @param {string} route route to which should router navigate
   */
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Creates source objects for KYPO trainings buttons. Visibility is determined based on user roles.
   */
  private createTrainingButtons() {
    this.trainingRoles = [
      {
        name: 'Designer',
        disabled: !this.activeUserService.isDesigner(),
        route: '/designer'
      },
      {
        name: 'Organizer',
        disabled: !this.activeUserService.isOrganizer(),
        route: '/organizer'

      },
      {
        name: 'Trainee',
        disabled: !this.activeUserService.isTrainee(),
        route: '/trainee'
      }
    ];
  }

  /**
   * Creates source objects for CyberEx buttons.
   */
  private createCyberExButtons() {
    this.cyberExerciseRoles = [
      {
        name: 'Designer',
        disabled: true,
        route: ''
      },
      {
        name: 'Organizer',
        disabled: true,
        route: ''
      },
      {
        name: 'Participant',
        disabled: true,
        route: ''
      }
    ];
  }

  /**
   * Creates source objects for other agenda buttons.
   */
  private createOtherAgendaButtons() {
    this.otherAgendaRoles = [
      {
        name: 'Administrator',
        disabled: true,
        route: ''
      },
      {
        name: 'Sandbox Designer',
        disabled: true,
        route: ''
      },
    ];
  }

  /**
   * Subscribes to changes in active user (logged out/in) and recalculates source objects and visibility based on roles of new user.
   */
  private subscribeUserChange() {
    this.userChangeSubscription = this.activeUserService.onActiveUserChanged.
      subscribe(id => {
        this.createTrainingButtons();
        this.createCyberExButtons();
        this.createOtherAgendaButtons();
    });
  }

}
