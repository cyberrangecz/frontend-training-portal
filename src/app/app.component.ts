import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingDistractionFreeModeService} from "./services/training-distraction-free-mode.service";
import {authConfig} from "./auth/auth-config";
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {ActiveUserService} from "./services/active-user.service";
import {User} from "./model/user/user";
import {Set} from "typescript-collections";
import {UserRoleEnum} from "./enums/user-role.enum";

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
    this.loadProfile();
    this.subscribeOidcEvents();
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
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: context => {
        console.log(this.oAuthService.hasValidAccessToken());
        console.log(this.oAuthService.hasValidIdToken());
        console.log(this.oAuthService.authorizationHeader());
      }
    });
    this.oAuthService.setupAutomaticSilentRefresh();
  }

  private loadProfile() {
    //const claims = this.oAuthService.getIdentityClaims();
    this.activeUserService.loadProfile();

  }

  private subscribeOidcEvents() {
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_received') {
          this.loadProfile()
      }
      if (event.type === 'token_refresh_error') {
        // this.activeUserService.logout();
        //this.router.navigate(['/login']);
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
