import {Component, OnDestroy, OnInit} from '@angular/core';
import {DistractionFreeModeService} from './services/shared/distraction-free-mode.service';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {AlertService} from './services/shared/alert.service';
import {takeWhile} from 'rxjs/operators';
import {AlertTypeEnum} from './model/enums/alert-type.enum';
import {BaseComponent} from './components/base.component';
import {Observable} from 'rxjs';
import {LoadingService} from './services/shared/loading.service';

/**
 * Main component serving as wrapper for layout and router outlet
 */
@Component({
  selector: 'kypo2-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  distractionFreeMode$: Observable<boolean>;
  activeUser$: Observable<User>;

  constructor(private authService: Kypo2AuthService,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private distractionFreeMode: DistractionFreeModeService) {
    super();
    this.activeUser$ = this.authService.activeUser$;
    this.distractionFreeMode$ = this.distractionFreeMode.isActive;
    this.isLoading$ = this.loadingService.isLoading$;
    this.subscribeAuthErrors();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.authService.dispose();
  }

  private subscribeAuthErrors() {
    this.authService.authError$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(error => this.alertService.emitAlert(AlertTypeEnum.Error, error.toString()));
  }
}
