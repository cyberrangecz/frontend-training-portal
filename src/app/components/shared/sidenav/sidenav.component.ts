import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveUserService} from "../../../services/shared/active-user.service";
import {UserMenuSection} from "../../../model/menu/user-menu-section.model";
import {Agenda} from "../../../model/menu/agenda.model";

@Component({
  selector: 'shared-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
/**
 * Component of sidebar navigation. Changes dynamically based on roles of a user
 */
export class SidenavComponent implements OnInit, OnDestroy {

  menuSections: UserMenuSection[];
  private userChangeSubscription;

  constructor(private activeUserService: ActiveUserService) {

  }

  ngOnInit() {
    this.initUserMenu();
    this.subscribeUserChange();
  }

  ngOnDestroy() {
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
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
        isVisible: this.activeUserService.isDesigner(),
        route: '/designer'
      },
      {
        title: 'Organizer',
        isVisible: this.activeUserService.isOrganizer(),
        route: '/organizer'
      },
      {
        title: 'Trainee',
        isVisible: this.activeUserService.isTrainee(),
        route: '/trainee'
      }
    ];
  }

  private createOtherAgendas(): Agenda[] {
    return [
      {
        title: 'Administrator',
        isVisible: this.activeUserService.isAdmin(),
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
    this.userChangeSubscription = this.activeUserService.onActiveUserChanged
      .subscribe(user => {
        this.initUserMenu();
      })
  }
}
