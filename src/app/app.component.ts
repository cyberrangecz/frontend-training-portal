import {Component, OnInit} from '@angular/core';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {debounceTime, filter, map, takeWhile} from 'rxjs/operators';
import {BaseComponent} from './components/base.component';
import {AlertTypeEnum} from './model/enums/alert-type.enum';
import {AlertService} from './services/shared/alert.service';
import {DistractionFreeModeService} from './services/shared/distraction-free-mode.service';
import {LoadingService} from './services/shared/loading.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from './services/shared/error-handler.service';
import {NavBuilder} from './model/utils/nav-builder';
import {AgendaContainer} from 'csirt-mu-layout';

/**
 * Main component serving as wrapper for layout and router outlet
 */
@Component({
  selector: 'kypo2-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  isLoading$: Observable<boolean>;
  distractionFreeMode$: Observable<boolean>;
  activeUser$: Observable<User>;
  agendaContainers$: Observable<AgendaContainer[]>;

  constructor(private router: Router,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private errorHandler: ErrorHandlerService,
              private distractionFreeMode: DistractionFreeModeService,
              private auth: Kypo2AuthService,
) {
    super();
    this.activeUser$ = this.auth.activeUser$;
    this.agendaContainers$ = this.auth.activeUser$
      .pipe(
        filter(user => user !== null && user !== undefined),
        map(user => NavBuilder.build(user))
      );
    this.distractionFreeMode$ = this.distractionFreeMode.isActive$;
    this.isLoading$ = this.loadingService.isLoading$
      .pipe(
        debounceTime(0)
      );
    this.subscribeKypo2AuthErrors();
  }

  ngOnInit() {
  }

  onLogin() {
    this.auth.login();
  }

  onLogout() {
    this.auth.logout();
  }

  private subscribeKypo2AuthErrors() {
    this.auth.authError$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(error => this.alertService.emitAlert(AlertTypeEnum.Error, error.toString()));
  }
}
