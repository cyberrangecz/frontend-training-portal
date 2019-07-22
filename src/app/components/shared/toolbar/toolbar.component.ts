import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {Subscription, SubscriptionLike} from "rxjs";
import {Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'shared-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
/**
 * Main toolbar of the application. Shows logo and a user menu component
 */
export class ToolbarComponent extends BaseComponent implements OnInit, OnDestroy {

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
    if (this.locationChangeSubscription && !this.locationChangeSubscription.closed)
      this.locationChangeSubscription.unsubscribe()
  }

  goToParentLocation() {
    const path = this.location.path(false);
    if (this.isInDesignerSublocation(path)) {
      this.navigateToParentFromDesigner(path);
    }
    else if (this.isInOrganizerSublocation(path)) {
      this.navigateToParentFromOrganizer(path);
    }
    else if (this.isInTraineeSublocation(path)) {
      this.navigateToParentFromTrainee(path);
    }
    else if (this.isInOtherSublocation(path)) {
      this.router.navigate(['home']);
    }
  }

  private resolveIsHome() {
    let path = this.location.path(false);
    this.isHome = path.endsWith('home')
      || (!this.isInDesignerSublocation(path)
          && !this.isInOrganizerSublocation(path)
          && !this.isInTraineeSublocation(path)
          && !this.isInAdminSublocation(path)
      );
  }


  private isInDesignerSublocation(path: string): boolean {
    return path.includes('designer')
  }

  private navigateToParentFromDesigner(path: string) {
    if (path.endsWith('designer')) {
      this.router.navigate(['home'])
    }
    else {
      this.router.navigate(['designer'])
    }
  }

  private isInOrganizerSublocation(path: string) {
    return path.includes('organizer')
  }

  private navigateToParentFromOrganizer(path: string) {
    if (path.endsWith('organizer')) {
      this.router.navigate(['home'])
    }
    else {
      this.router.navigate(['organizer'])
    }
  }

  private isInTraineeSublocation(path: string) {
    return path.includes('trainee')
  }

  private navigateToParentFromTrainee(path: string) {
    if (path.endsWith('trainee')) {
      this.router.navigate(['home'])
    }
    else {
      this.router.navigate(['trainee'])
    }
  }

  private isInOtherSublocation(path: string) {
    return !this.isInDesignerSublocation(path)
      && !this.isInOrganizerSublocation(path)
      && !this.isInTraineeSublocation(path)
  }

  private isInAdminSublocation(path: string) {
    return path.includes('admin');
  }
}
