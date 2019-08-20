import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {SubscriptionLike} from 'rxjs';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {
  ADMIN_GROUP_PATH, ADMIN_USER_PATH,
  HOME_PATH,
  TRAINING_DEFINITION_PATH,
  TRAINING_INSTANCE_PATH,
  TRAINING_RUN_PATH
} from '../../../paths';

@Component({
  selector: 'kypo2-shared-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
/**
 * Main toolbar of the application. Shows logo and a user menu component
 */
export class ToolbarComponent extends BaseComponent implements OnInit, OnDestroy {

  readonly HOME_PATH = HOME_PATH;
  isHome: boolean;

  private locationChangeSubscription: SubscriptionLike;

  constructor(private location: Location,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.resolveIsHome();
    this.locationChangeSubscription = this.location.subscribe(locationChange => {
      this.resolveIsHome();
    });

    this.router.events
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(routerEvent => this.resolveIsHome());
  }

  ngOnDestroy(): void {
    if (this.locationChangeSubscription && !this.locationChangeSubscription.closed) {
      this.locationChangeSubscription.unsubscribe();
    }
  }

  goToParentLocation() {
    const path = this.location.path(false);
    if (this.isInTrainingDefinitionSublocation(path)) {
      this.navigateToParentFromDesigner(path);
    } else if (this.isInTrainingInstanceSublocation(path)) {
      this.navigateToParentFromOrganizer(path);
    } else if (this.isInTrainingRunSublocation(path)) {
      this.navigateToParentFromTrainee(path);
    } else if (this.isInOtherSublocation(path)) {
      this.router.navigate([HOME_PATH]);
    }
  }

  private resolveIsHome() {
    const path = this.location.path(false);
    this.isHome = path.endsWith(HOME_PATH);
  }


  private isInTrainingDefinitionSublocation(path: string): boolean {
    return path.includes(TRAINING_DEFINITION_PATH);
  }

  private navigateToParentFromDesigner(path: string) {
    if (path.endsWith(TRAINING_DEFINITION_PATH)) {
      this.router.navigate([HOME_PATH]);
    } else {
      this.router.navigate([TRAINING_DEFINITION_PATH]);
    }
  }

  private isInTrainingInstanceSublocation(path: string) {
    return path.includes(TRAINING_INSTANCE_PATH);
  }

  private navigateToParentFromOrganizer(path: string) {
    if (path.endsWith(TRAINING_INSTANCE_PATH)) {
      this.router.navigate([HOME_PATH]);
    } else {
      this.router.navigate([TRAINING_INSTANCE_PATH]);
    }
  }

  private isInTrainingRunSublocation(path: string) {
    return path.includes(TRAINING_RUN_PATH);
  }

  private navigateToParentFromTrainee(path: string) {
    if (path.endsWith(TRAINING_RUN_PATH)) {
      this.router.navigate([HOME_PATH]);
    } else {
      this.router.navigate([TRAINING_RUN_PATH]);
    }
  }

  private isInOtherSublocation(path: string) {
    return !this.isInTrainingDefinitionSublocation(path)
      && !this.isInTrainingInstanceSublocation(path)
      && !this.isInTrainingRunSublocation(path);
  }

  private isInAdminSublocation(path: string) {
    return path.includes(ADMIN_GROUP_PATH || ADMIN_USER_PATH);
  }
}
