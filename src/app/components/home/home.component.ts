import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Kypo2AuthService} from 'kypo2-auth';
import {takeWhile} from 'rxjs/operators';
import {
  ADMIN_GROUP_PATH,
  ADMIN_MICROSERVICE_PATH,
  ADMIN_USER_PATH,
  SANDBOX_DEFINITION_PATH,
  SANDBOX_POOL_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from '../../paths';
import {KypoBaseComponent} from 'kypo-common';

/**
 * Main component of homepage (portal) page. Portal page is a main crossroad of possible sub pages. Only those matching with user
 * role are accessible.
 */
@Component({
  selector: 'kypo2-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends KypoBaseComponent implements OnInit {

  trainingAgendas;
  sandboxAgendas;
  adminAgendas;

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
    this.trainingAgendas = [
      {
        name: 'Training Definition',
        disabled: !this.authService.isTrainingDesigner(),
        route: TRAINING_DEFINITION_PATH
      },
      {
        name: 'Training Instance',
        disabled: !this.authService.isTrainingOrganizer(),
        route: TRAINING_INSTANCE_PATH

      },
      {
        name: 'Training Run',
        disabled: !this.authService.isTrainingTrainee(),
        route: TRAINING_RUN_PATH
      }
    ];
  }

  private createSanboxButtons() {
    this.sandboxAgendas = [
      {
        name: 'Sandbox Definition',
        disabled: !this.authService.isTrainingDesigner(),
        route: SANDBOX_DEFINITION_PATH
      },
      {
        name: 'Pool',
        disabled: !this.authService.isTrainingDesigner(),
        route: SANDBOX_POOL_PATH
      },
    ];
  }

  private createAdminButtons() {
    this.adminAgendas = [
      {
        name: 'User',
        disabled: !this.authService.isUserAndGroupAdmin(),
        route: ADMIN_USER_PATH
      },
      {
        name: 'Group',
        disabled: !this.authService.isUserAndGroupAdmin(),
        route: ADMIN_GROUP_PATH
      },
      {
        name: 'Microservice',
        disabled: !this.authService.isUserAndGroupAdmin(),
        route: ADMIN_MICROSERVICE_PATH
      },
    ];
  }

  private subscribeUserChange() {
    this.authService.activeUser$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(user => {
      this.initRoutes();
    });
  }

}
