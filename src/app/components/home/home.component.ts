import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentinelAuthService } from '@sentinel/auth';
import { SentinelBaseDirective } from '@sentinel/common';
import { SANDBOX_DEFINITION_PATH, SANDBOX_POOL_PATH, SANDBOX_RESOURCES_PATH } from 'kypo-sandbox-agenda';
import { TRAINING_DEFINITION_PATH, TRAINING_INSTANCE_PATH, TRAINING_RUN_PATH } from 'kypo-training-agenda';
import { GROUP_PATH, MICROSERVICE_PATH, USER_PATH } from 'kypo-user-and-group-agenda';
import { takeWhile } from 'rxjs/operators';
import { RoleResolver } from '../../utils/role-resolver';

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
  trainingAgendas;
  sandboxAgendas;
  adminAgendas;

  constructor(private authService: SentinelAuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.initRoutes();
    this.subscribeUserChange();
  }

  /**
   * Navigates to specified route
   * @param route route to which should router navigate
   */
  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

  private initRoutes() {
    this.createTrainingButtons();
    this.createSanboxButtons();
    this.createAdminButtons();
  }

  private createTrainingButtons() {
    const roles = this.authService.getRoles();
    this.trainingAgendas = [
      {
        name: 'Training Definition',
        disabled: !RoleResolver.isTrainingDesigner(roles),
        route: TRAINING_DEFINITION_PATH,
      },
      {
        name: 'Training Instance',
        disabled: !RoleResolver.isTrainingOrganizer(roles),
        route: TRAINING_INSTANCE_PATH,
      },
      {
        name: 'Training Run',
        disabled: !RoleResolver.isTrainingTrainee(roles),
        route: TRAINING_RUN_PATH,
      },
    ];
  }

  private createSanboxButtons() {
    const roles = this.authService.getRoles();
    this.sandboxAgendas = [
      {
        name: 'Sandbox Definition',
        disabled: !RoleResolver.isSandboxDesigner(roles),
        route: SANDBOX_DEFINITION_PATH,
      },
      {
        name: 'Pool',
        disabled: !RoleResolver.isSandboxOrganizer(roles),
        route: SANDBOX_POOL_PATH,
      },
      {
        name: 'Resources',
        disabled: !RoleResolver.isSandboxOrganizer(roles),
        route: SANDBOX_RESOURCES_PATH,
      },
    ];
  }

  private createAdminButtons() {
    const disabled = !RoleResolver.isUserAndGroupAdmin(this.authService.getRoles());
    this.adminAgendas = [
      {
        name: 'User',
        disabled,
        route: USER_PATH,
      },
      {
        name: 'Group',
        disabled,
        route: GROUP_PATH,
      },
      {
        name: 'Microservice',
        disabled,
        route: MICROSERVICE_PATH,
      },
    ];
  }

  private subscribeUserChange() {
    this.authService.activeUser$.pipe(takeWhile(() => this.isAlive)).subscribe((user) => {
      this.initRoutes();
    });
  }
}
