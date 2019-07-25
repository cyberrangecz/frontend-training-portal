import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingDistractionFreeModeService} from "./services/shared/training-distraction-free-mode.service";
import {Router} from "@angular/router";
import {Kypo2AuthService} from 'kypo2-auth';
import {AlertService} from "./services/shared/alert.service";
import {takeWhile} from "rxjs/operators";
import {AlertTypeEnum} from "./model/enums/alert-type.enum";
import {BaseComponent} from "./components/base.component";
import {SandboxAllocationService} from "./services/organizer/sandbox-allocation/sandbox-allocation.service";

/**
 * Main component serving as wrapper for sidenav, toolbar and inner routed views
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  isSidenavOpen: boolean = false;
  distractionFreeMode: boolean = true;

  constructor(private router: Router,
              private authService: Kypo2AuthService,
              private alertService: AlertService,
              private distractionFreeModeService: TrainingDistractionFreeModeService) {
    super();
  }

  ngOnInit() {
    this.distractionFreeMode = this.distractionFreeModeService.getDistractionFreeMode();
    this.subscribeDistractionFreeModeChanges();
    this.subscribeAuthErrors();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.authService.dispose();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  private subscribeDistractionFreeModeChanges() {
    this.distractionFreeModeService.modeChanged
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(change => this.distractionFreeMode = change);
  }

  private subscribeAuthErrors() {
    this.authService.authError$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(error => this.alertService.emitAlert(AlertTypeEnum.Error, error.toString()));
  }
}
