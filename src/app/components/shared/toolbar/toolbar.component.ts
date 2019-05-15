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

  goBack() {
    this.location.back();
  }

  private resolveIsHome() {
    this.isHome = this.location.path(false).endsWith('home');
  }

}
