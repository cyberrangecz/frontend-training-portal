import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Kypo2AuthService} from 'kypo2-auth';
import {BaseComponent} from "../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'overview',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
/**
 * Main component of portal page. Portal page is a main crossroad of possible sub pages. Only those matching with user
 * role are accessible.
 */
export class PortalComponent extends BaseComponent implements OnInit {

  trainingRoles;
  cyberExerciseRoles;
  otherAgendaRoles;

  constructor(
    private authService: Kypo2AuthService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.initRoutes();
    this.subscribeUserChange();
  }

  /**
   * Navigates to specified route
   * @param {string} route route to which should router navigate
   */
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

  private initRoutes() {
    this.createTrainingButtons();
    this.createCyberExButtons();
    this.createOtherAgendaButtons();
  }

  private createTrainingButtons() {
    this.trainingRoles = [
      {
        name: 'Designer',
        disabled: !this.authService.isTrainingDesigner(),
        route: '/designer'
      },
      {
        name: 'Organizer',
        disabled: !this.authService.isTrainingOrganizer(),
        route: '/organizer'

      },
      {
        name: 'Trainee',
        disabled: !this.authService.isTrainingTrainee(),
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
        disabled: !this.authService.isUserAndGroupAdmin(),
        route: '/admin'
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
    this.authService.activeUser$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(user => {
      this.initRoutes();
    });
  }

}
