import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingDistractionFreeModeService} from "./services/training-distraction-free-mode.service";
import {authConfig} from "./config/auth-config";
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {ActiveUserService} from "./services/active-user.service";

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
  distractionFreeModeSubscription;

  constructor(private router: Router,
              private oAuthService: OAuthService,
              private activeUserService: ActiveUserService,
              private distractionFreeModeService: TrainingDistractionFreeModeService) {
  }


  ngOnInit() {
    this.subscribeOIDCEvents();
    this.configureOidc();
    this.distractionFreeMode = this.distractionFreeModeService.getDistractionFreeMode();
    this.subscribeForDistractionFreeModeChanges();
  }

  ngOnDestroy() {
    if (this.distractionFreeModeSubscription) {
      this.distractionFreeModeSubscription.unsubscribe();
    }
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  private configureOidc() {
    this.oAuthService.setStorage(localStorage);
    this.oAuthService.configure(authConfig);
    this.oAuthService.loadDiscoveryDocument()
      .then(() => {
        this.oAuthService.tryLogin()
          .then(() => {
            this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
            this.oAuthService.setupAutomaticSilentRefresh();
          })
      });
  }

  private subscribeOIDCEvents() {
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_refresh_error'
        || event.type === 'token_error'
        || event.type === 'silent_refresh_error'
        || event.type === 'token_validation_error') {
          console.log(event.type);
          this.activeUserService.logout();
          this.router.navigate(['/login']);
      }
    })
  }

  /**
   * Subscribes to changes of distraction free mode (mode without sidebar and toolbar)
   */
  private subscribeForDistractionFreeModeChanges() {
    this.distractionFreeModeService.modeChanged
      .subscribe(change => this.distractionFreeMode = change);
  }
}
