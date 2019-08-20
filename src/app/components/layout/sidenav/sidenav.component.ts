import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserMenuSection} from '../../../model/menu/user-menu-section.model';
import {Agenda} from '../../../model/menu/agenda.model';
import {Kypo2AuthService} from 'kypo2-auth';
import {BaseComponent} from '../../base.component';
import {takeWhile} from 'rxjs/operators';
import {
  ADMIN_GROUP_PATH,
  ADMIN_USER_PATH, SANDBOX_DEFINITION_PATH, SANDBOX_POOL_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from '../../../paths';

@Component({
  selector: 'kypo2-shared-sidenav',
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

    const sandboxAgendas = this.getActiveSandboxAgendas();
    if (sandboxAgendas.length > 0) {
      this.menuSections.push(
        {
          name: 'SANDBOXES',
          agendas: sandboxAgendas,
        });
    }


    const otherAgendas = this.getActiveAdminAgendas();
    if (otherAgendas.length > 0) {
      this.menuSections.push(
        {
          name: 'ADMIN',
          agendas: otherAgendas,
        });
    }
  }

  private getActiveTrainingAgendas(): Agenda[] {
    return this.createTrainingAgendas().filter(agenda => agenda.isVisible);
  }

  private getActiveAdminAgendas(): Agenda[] {
    return this.createOtherAgendas().filter(agenda => agenda.isVisible);
  }

  private getActiveSandboxAgendas(): Agenda[] {
    return this.createSandboxAgendas().filter(agenda => agenda.isVisible);
  }

  private createTrainingAgendas(): Agenda[] {
    return [
      {
        title: 'Training Definition',
        isVisible: this.authService.isTrainingDesigner(),
        route: '/' + TRAINING_DEFINITION_PATH
      },
      {
        title: 'Training Instance',
        isVisible: this.authService.isTrainingOrganizer(),
        route: '/' + TRAINING_INSTANCE_PATH
      },
      {
        title: 'Training Run',
        isVisible: this.authService.isTrainingTrainee(),
        route: '/' + TRAINING_RUN_PATH
      }
    ];
  }

  private createSandboxAgendas(): Agenda[] {
    return [
      {
        title: 'Sandbox Definition',
        isVisible: this.authService.isTrainingDesigner(),
        route: '/' + SANDBOX_DEFINITION_PATH
      },
      {
        title: 'Sandbox Instance',
        isVisible: false, //this.authService.isTrainingOrganizer(),
        route: '/' + SANDBOX_POOL_PATH
      },
    ];
  }

  private createOtherAgendas(): Agenda[] {
    return [
      {
        title: 'User',
        isVisible: this.authService.isUserAndGroupAdmin(),
        route: '/' + ADMIN_USER_PATH
      },
      {
        title: 'Group',
        isVisible: this.authService.isUserAndGroupAdmin(),
        route: '/' + ADMIN_GROUP_PATH
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
      });
  }
}
