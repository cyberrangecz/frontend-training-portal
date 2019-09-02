import {AfterViewInit, Component, HostListener, OnInit, } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2AuthService} from 'kypo2-auth';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {TrainingRunFacade} from '../../../services/facades/training-run-facade.service';

@Component({
  selector: 'kypo2-training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css'],
})
/**
 * Component displaying visualization of training run results
 */
export class TrainingRunResultsComponent extends BaseComponent implements OnInit, AfterViewInit {

  display = false;
  vizSize: {width: number, height: number};

  isLoading = true;
  isInErrorState = false;
  trainingDefinitionId: number;
  trainingInstanceId: number;
  activeUserUco: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: Kypo2AuthService,
              private errorHandler: ErrorHandlerService,
              private trainingRunFacade: TrainingRunFacade) {
    super();
}

  ngOnInit() {
    this.setVisualizationSize(window.innerWidth, innerHeight);
    this.loadData();
  }

  ngAfterViewInit() {
    // hack because visualization components won't render properly
    // (probably because changing the setting of distraction free mode when leaving last level)
    setTimeout(x => this.display = true, 1);
  }

  @HostListener('window:resize')
  onResize(event) {
    this.setVisualizationSize(event.target.innerWidth, event.target.innerHeight);
  }

  loadData() {
    this.activeUserUco = this.parseUcoFromUserLogin();
    const routeSnapshot = this.activatedRoute.snapshot;
    if (routeSnapshot.paramMap.has('id')) {
      const trainingRunId = Number(routeSnapshot.paramMap.get('id'));
      this.isLoading = true;
      this.trainingRunFacade.getTrainingRunById(trainingRunId)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
          trainingRun => {
          this.trainingInstanceId = trainingRun.trainingInstanceId;
          this.trainingDefinitionId = trainingRun.trainingDefinitionId;
            this.isLoading = false;
        },
          err => {
            this.errorHandler.displayInAlert(err, 'Loading results of training run');
            this.isInErrorState = true;
            this.isLoading = false;
          }
          );
    } else {
      this.isInErrorState = true;
    }
  }

  private parseUcoFromUserLogin() {
    return this.authService.getActiveUser().login.split('@')[0];
  }

  private setVisualizationSize(windowWidth: number, windowHeight: number) {
      const width = windowWidth / 2;
      const height = windowHeight / 2;
      this.vizSize = { width: width, height: height };
  }
}
