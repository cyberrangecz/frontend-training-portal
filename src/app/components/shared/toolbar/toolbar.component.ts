import {Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {SubscriptionLike} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'shared-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
/**
 * Main toolbar of the application. Shows logo and a user menu component
 */
export class ToolbarComponent implements OnInit, OnDestroy {

  isHome: boolean;

  private _locationChangeSubscription: SubscriptionLike;

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.resolveIsHome();
    this._locationChangeSubscription = this.location.subscribe(locationChange => {
      this.resolveIsHome();
    });

    this.router.events.subscribe(routerEvent => this.resolveIsHome());
  }

  ngOnDestroy(): void {
    if (this._locationChangeSubscription && !this._locationChangeSubscription.closed)
      this._locationChangeSubscription.unsubscribe()
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
    this.isHome = this.location.path(false).endsWith('home');
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
}
