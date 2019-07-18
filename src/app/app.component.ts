import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingDistractionFreeModeService} from "./services/shared/training-distraction-free-mode.service";
import {Router} from "@angular/router";
import {SandboxAllocationBarService} from './services/organizer/sandbox-allocation/sandbox-allocation-bar.service';
import {SandboxAllocationBarState} from './model/enums/sandbox-allocation-bar-state.enum';
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
  isSandboxBarActive: boolean;

  sandboxAllocationBarSubscription: Subscription;
  distractionFreeModeSubscription: Subscription;

  constructor(private router: Router,
              private authService: Kypo2AuthService,
              private sandboxAllocationBarService: SandboxAllocationBarService,
              private distractionFreeModeService: TrainingDistractionFreeModeService) {
  }

  ngOnInit() {
    this.distractionFreeMode = this.distractionFreeModeService.getDistractionFreeMode();
    this.isSandboxBarActive = this.sandboxAllocationBarService.isOpen();
    this.subscribeDistractionFreeModeChanges();
    this.subscribeAllocationBarChanges();
  }

  ngOnDestroy() {
    if (this.distractionFreeModeSubscription) {
      this.distractionFreeModeSubscription.unsubscribe();
    }
    if (this.sandboxAllocationBarSubscription) {
      this.sandboxAllocationBarSubscription.unsubscribe();
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

  private subscribeAllocationBarChanges() {
    this.sandboxAllocationBarSubscription = this.sandboxAllocationBarService.sandboxAllocationBarStateChange
      .subscribe(state => {
        if (state === SandboxAllocationBarState.OPEN) {
          this.isSandboxBarActive = true;
        }
        if (state === SandboxAllocationBarState.CLOSED) {
          this.isSandboxBarActive = false;
        }
      })
  }
}
