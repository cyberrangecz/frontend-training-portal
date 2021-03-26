import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentinelAuthService, UserRole } from '@sentinel/auth';
import { SentinelBaseDirective } from '@sentinel/common';
import { SANDBOX_DEFINITION_PATH, SANDBOX_POOL_PATH, SANDBOX_RESOURCES_PATH } from '@muni-kypo-crp/sandbox-agenda';
import {
  ADAPTIVE_DEFINITION_PATH,
  ADAPTIVE_INSTANCE_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH,
} from '@muni-kypo-crp/training-agenda';
import { GROUP_PATH, MICROSERVICE_PATH, USER_PATH } from '@muni-kypo-crp/user-and-group-agenda';
import { takeWhile } from 'rxjs/operators';
import { AgendaPortalLink } from '../../model/agenda-portal-link';
import { PortalAgendaContainer } from '../../model/portal-agenda-container';
import { RoleResolver } from '../../utils/role-resolver';
import { AgendaMenuItem } from '../../model/agenda-menu-item';

/**
 * Main component of homepage (portal) page. Portal page is a main crossroad of possible sub pages. Only those matching with user
 * role are accessible.
 */
@Component({
  selector: 'kypo2-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends SentinelBaseDirective implements OnInit {
  elevated: string;
  roles: UserRole[];
  portalAgendaContainers: PortalAgendaContainer[] = [];

  constructor(private authService: SentinelAuthService, private router: Router) {
    super();
  }

  static createExpandedControlButtons(path: string[]): AgendaMenuItem[] {
    return [
      new AgendaMenuItem('timeline', 'Adaptive', path[0]),
      new AgendaMenuItem('videogame_asset', 'Linear', path[1]),
    ];
  }

  ngOnInit(): void {
    this.roles = this.authService.getRoles();
    this.initRoutes();
    this.subscribeUserChange();
  }

  /**
   * Navigates to specified route
   * @param route route to which should router navigate
   */
  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  setElevation(buttonName: string): void {
    this.elevated = buttonName;
  }

  private initRoutes() {
    this.portalAgendaContainers = [
      {
        agendas: this.createParticipateButtons(),
        label: 'Participate',
        displayed: RoleResolver.isTrainingTrainee(this.roles),
        children: [],
      },
      {
        agendas: this.createDesignButtons(),
        label: 'Design',
        displayed: RoleResolver.isTrainingDesigner(this.roles) || RoleResolver.isSandboxDesigner(this.roles),
        children: [],
      },
      {
        agendas: this.createOrganizeButtons(),
        label: 'Organize',
        displayed: RoleResolver.isTrainingOrganizer(this.roles) || RoleResolver.isSandboxOrganizer(this.roles),
        children: [],
      },
      {
        agendas: this.createManageButtons(),
        label: 'Manage',
        displayed: RoleResolver.isUserAndGroupAdmin(this.roles),
        children: [],
      },
    ];
  }

  private createParticipateButtons() {
    return [
      new AgendaPortalLink(
        'Training Run',
        !RoleResolver.isTrainingTrainee(this.roles),
        TRAINING_RUN_PATH,
        'Training Run allows you to start a new capture the flag (CTF) game, return to unfinished one,' +
          ' or to access results of those you already finished.',
        'games'
      ),
    ];
  }

  private createDesignButtons(): AgendaPortalLink[] {
    return [
      new AgendaPortalLink(
        'Sandbox Definition',
        !RoleResolver.isSandboxDesigner(this.roles),
        SANDBOX_DEFINITION_PATH,
        'In the sandbox definition agenda, you can manage sandbox configurations, i.e., descriptions' +
          ' of virtual networks and computers that can be instantiated in isolated sandboxes.',
        'event_note'
      ),
      new AgendaPortalLink(
        'Training Definition',
        !RoleResolver.isTrainingDesigner(this.roles),
        TRAINING_DEFINITION_PATH,
        'The training definition is a plot of the single-player CTF games. You can manage your own and design new ones.',
        'assignment',
        HomeComponent.createExpandedControlButtons([ADAPTIVE_DEFINITION_PATH, TRAINING_DEFINITION_PATH])
      ),
    ];
  }

  private createOrganizeButtons() {
    return [
      new AgendaPortalLink(
        'Pool',
        !RoleResolver.isSandboxOrganizer(this.roles),
        SANDBOX_POOL_PATH,
        'As an instructor, you can create Pools of sandboxes that serve for the instantiating and management of sandbox definitions.',
        'subscriptions'
      ),
      new AgendaPortalLink(
        'Training Instance',
        !RoleResolver.isTrainingOrganizer(this.roles),
        TRAINING_INSTANCE_PATH,
        'You can also create training instances that are necessary if you want to organize a CTF game hands-on session.',
        'event',
        HomeComponent.createExpandedControlButtons([ADAPTIVE_INSTANCE_PATH, TRAINING_INSTANCE_PATH])
      ),
      new AgendaPortalLink(
        'Resources',
        !RoleResolver.isSandboxOrganizer(this.roles),
        SANDBOX_RESOURCES_PATH,
        'In the resources agenda, you can view cloud resources and its state.',
        'donut_large'
      ),
    ];
  }

  private createManageButtons() {
    const disabled = !RoleResolver.isUserAndGroupAdmin(this.roles);
    return [
      new AgendaPortalLink(
        'Groups',
        disabled,
        GROUP_PATH,
        'In Groups, you can manage groups and define access rights available to the group members.',
        'group'
      ),
      new AgendaPortalLink(
        'Users',
        disabled,
        USER_PATH,
        'The Users agenda serves for assigning KYPO users to existing groups.',
        'person'
      ),
      new AgendaPortalLink(
        'Microservices',
        disabled,
        MICROSERVICE_PATH,
        'You can also manage microservices that provide the KYPO Cyber Range functionality.' +
          ' Please do not mess with it unless you know what you are doing.',
        'account_tree'
      ),
    ];
  }

  private subscribeUserChange() {
    this.authService.activeUser$.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.initRoutes();
    });
  }
}
