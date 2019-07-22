import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserMenuSection} from "../../../model/menu/user-menu-section.model";
import {Agenda} from "../../../model/menu/agenda.model";
import {Kypo2AuthService} from 'kypo2-auth';
import {BaseComponent} from "../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'shared-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
/**
 * Component of sidebar navigation. Changes dynamically based on roles of a user
 */
export class SidenavComponent extends BaseComponent  implements OnInit, OnDestroy {

  menuSections: UserMenuSection[];

  constructor(private authService: Kypo2AuthService) {
    super();
  }

  ngOnInit() {
    this.initUserMenu();
    this.subscribeUserChange();
  }

  private initUserMenu() {
    this.menuSections = [];
    const trainingAgendas = this.getActiveTrainingAgendas();

    if (trainingAgendas.length > 0) {
      this.menuSections.push(
        {
          name: 'TRAININGS',
          agendas: trainingAgendas,
        });
    }

    const otherAgendas = this.getActiveOtherAgendas();
    if (otherAgendas.length > 0) {
      this.menuSections.push(
        {
          name: 'OTHER AGENDAS',
          agendas: this.getActiveOtherAgendas(),
        });
    }
  }

  private getActiveTrainingAgendas(): Agenda[] {
    return this.createTrainingAgendas().filter(agenda => agenda.isVisible);
  }

  private getActiveOtherAgendas(): Agenda[] {
    return this.createOtherAgendas().filter(agenda => agenda.isVisible);
  }

  private createTrainingAgendas(): Agenda[] {
    return [
      {
        title: 'Designer',
        isVisible: this.authService.isTrainingDesigner(),
        route: '/designer'
      },
      {
        title: 'Organizer',
        isVisible: this.authService.isTrainingOrganizer(),
        route: '/organizer'
      },
      {
        title: 'Trainee',
        isVisible: this.authService.isTrainingTrainee(),
        route: '/trainee'
      }
    ];
  }

  private createOtherAgendas(): Agenda[] {
    return [
      {
        title: 'Administrator',
        isVisible: this.authService.isUserAndGroupAdmin(),
        route: '/admin'
      },
      {
        title: 'Sandbox Designer',
        isVisible: false,
        route: ''
      },
    ];
  }

  /**
   * Subscribes for changes of active (logged in) user and in case of changes recalculates visibility of trainings based on his roles.
   */
  private subscribeUserChange() {
    this.authService.activeUser$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(user => {
        this.initUserMenu();
      })
  }
}
