import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingDistractionFreeModeService} from "./services/shared/training-distraction-free-mode.service";
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {Kypo2AuthService} from 'kypo2-auth';

/**
 * Main component serving as wrapper for sidenav, toolbar and inner routed views
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isSidenavOpen: boolean = false;
  distractionFreeMode: boolean = true;
  distractionFreeModeSubscription: Subscription;

  constructor(private router: Router,
              private authService: Kypo2AuthService,
              private distractionFreeModeService: TrainingDistractionFreeModeService) {
  }

  ngOnInit() {
    this.distractionFreeMode = this.distractionFreeModeService.getDistractionFreeMode();
    this.subscribeDistractionFreeModeChanges();
  }

  ngOnDestroy() {
    if (this.distractionFreeModeSubscription) {
      this.distractionFreeModeSubscription.unsubscribe();
    }
    this.authService.dispose();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


  private subscribeDistractionFreeModeChanges() {
    this.distractionFreeModeSubscription = this.distractionFreeModeService.modeChanged
      .subscribe(change => this.distractionFreeMode = change);
  }
}
