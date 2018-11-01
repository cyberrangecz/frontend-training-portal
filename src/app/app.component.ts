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
    this.oAuthService.loadDiscoveryDocumentAndTryLogin ({
      onTokenReceived: context => {}
    }).then(() =>
      setTimeout(() => this.loadProfileAndNavigateHome(), 1));
    this.oAuthService.setupAutomaticSilentRefresh();
  }

  private loadProfileAndNavigateHome() {
    this.oAuthService.loadUserProfile().then((profile) => {
      const user: User = new User();
      user.id = 1;
      user.name = profile['name'];
      const roles = new Set<UserRoleEnum>();
      roles.add(UserRoleEnum.Designer);
      roles.add(UserRoleEnum.Organizer);
      roles.add(UserRoleEnum.Trainee);
      user.roles = roles;
      console.log(user);
      this.activeUserService.setActiveUser(user);
      this.router.navigate(['/home']);
    });
  }

  /**
   * Subscribes to changes of distraction free mode (mode without sidebar and toolbar)
   */
  private subscribeForDistractionFreeModeChanges() {
    this.distractionFreeModeService.modeChanged
      .subscribe(change => this.distractionFreeMode = change);
  }
}
