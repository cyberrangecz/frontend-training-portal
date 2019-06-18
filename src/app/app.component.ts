import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingDistractionFreeModeService} from "./services/shared/training-distraction-free-mode.service";
import {authConfig} from "./model/config/auth-config";
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {ActiveUserService} from "./services/shared/active-user.service";
import {SandboxAllocationBarService} from './services/organizer/sandbox-allocation/sandbox-allocation-bar.service';
import {SandboxAllocationBarState} from './model/enums/sandbox-allocation-bar-state.enum';
import {Subscription} from 'rxjs';

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
              private oAuthService: OAuthService,
              private activeUserService: ActiveUserService,
              private sandboxAllocationBarService: SandboxAllocationBarService,
              private distractionFreeModeService: TrainingDistractionFreeModeService) {
  }

  ngOnInit() {
    this.configureOIDC();
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
    this.activeUserService.dispose();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  private configureOIDC() {
    this.oAuthService.configure(authConfig);
    console.log(authConfig.postLogoutRedirectUri);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
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
