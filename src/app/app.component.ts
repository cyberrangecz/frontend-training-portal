import {Component, OnDestroy, OnInit} from '@angular/core';
import {Kypo2AuthService, User} from 'kypo2-auth';
import {Observable} from 'rxjs';
import {debounceTime, takeWhile} from 'rxjs/operators';
import {BaseComponent} from './components/base.component';
import {AlertTypeEnum} from './model/enums/alert-type.enum';
import {AlertService} from './services/shared/alert.service';
import {DistractionFreeModeService} from './services/shared/distraction-free-mode.service';
import {LoadingService} from './services/shared/loading.service';

/**
 * Main component serving as wrapper for layout and router outlet
 */
@Component({
  selector: 'kypo2-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  isLoading$: Observable<boolean>;
  distractionFreeMode$: Observable<boolean>;
  activeUser$: Observable<User>;

  constructor(private authService: Kypo2AuthService,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private distractionFreeMode: DistractionFreeModeService) {
    super();
    this.activeUser$ = this.authService.activeUser$;
    this.distractionFreeMode$ = this.distractionFreeMode.isActive$;
    this.isLoading$ = this.loadingService.isLoading$.pipe(debounceTime(0));
    this.subscribeAuthErrors();
  }

  ngOnInit() {
  }

  private subscribeAuthErrors() {
    this.authService.authError$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(error => this.alertService.emitAlert(AlertTypeEnum.Error, error.toString()));
  }
}
