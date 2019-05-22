import {AfterViewInit, Component, OnInit, } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrainingRunFacade} from "../../../../services/facades/training-run-facade.service";
import {ErrorHandlerService} from "../../../../services/shared/error-handler.service";
import {ActiveUserService} from '../../../../services/shared/active-user.service';

@Component({
  selector: 'training-run-results',
  templateUrl: './training-run-results.component.html',
  styleUrls: ['./training-run-results.component.css']
})
/**
 * Component displaying various visualization of training run results
 */
export class TrainingRunResultsComponent implements OnInit, AfterViewInit {
  display = false;

  isLoading: boolean = true;
  isInErrorState: boolean = false;
  trainingDefinitionId: number;
  trainingInstanceId: number;
  activeUserUco: string;

  constructor(private activatedRoute: ActivatedRoute,
              private activeUserService: ActiveUserService,
              private errorHandler: ErrorHandlerService,
              private trainingRunFacade: TrainingRunFacade) {
}

  ngOnInit() {
    this.loadData()
  }

  ngAfterViewInit() {
    // hack because visualization components won't render properly
    // (probably because changing the setting of distraction free mode when leaving last level)
    setTimeout(x => this.display = true, 1);
  }

  loadData() {
    this.activeUserUco = this.parseUcoFromUserLogin();
    const routeSnapshot = this.activatedRoute.snapshot;
    if (routeSnapshot.paramMap.has('id')) {
      const trainingRunId = Number(routeSnapshot.paramMap.get('id'));
      this.isLoading = true;
      this.trainingRunFacade.getTrainingRunById(trainingRunId)
        .subscribe(
          trainingRun => {
          this.trainingInstanceId = trainingRun.trainingInstanceId;
          this.trainingDefinitionId = trainingRun.trainingDefinitionId;
            this.isLoading = false;
        },
          err => {
            this.errorHandler.displayHttpError(err, 'Loading results of training run');
            this.isInErrorState = true;
            this.isLoading = false;
          }
          )
    } else {
      this.isInErrorState = true;
    }
  }

  private parseUcoFromUserLogin() {
    return this.activeUserService.getActiveUser().login.split('@')[0]
  }
}
