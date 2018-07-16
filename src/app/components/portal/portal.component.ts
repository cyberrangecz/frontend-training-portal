import { Component, OnInit } from '@angular/core';
import {ActiveUserService} from "../../services/active-user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'overview',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  trainingRoles;
  cyberExerciseRoles;
  otherAgendaRoles;

  constructor(
    private activeUserService: ActiveUserService,
    private router: Router) {

    this.createTrainingButtons();
    this.createCyberExButtons();
    this.createOtherAgendaButtons();
  }

  ngOnInit() {
  }

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

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

}
