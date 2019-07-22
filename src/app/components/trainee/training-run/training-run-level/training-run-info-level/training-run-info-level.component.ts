import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {InfoLevel} from "../../../../../model/level/info-level";
import {ActiveTrainingRunService} from "../../../../../services/trainee/active-training-run.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'training-run-info-level',
  templateUrl: './training-run-info-level.component.html',
  styleUrls: ['./training-run-info-level.component.css']
})

export class TrainingRunInfoLevelComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('level') level: InfoLevel;
  hasNextLevel: boolean;

  constructor(private activeLevelService: ActiveTrainingRunService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  ngOnInit() {
    this.hasNextLevel = this.activeLevelService.hasNextLevel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      this.hasNextLevel = this.activeLevelService.hasNextLevel();
    }
  }

  nextLevel() {
    this.activeLevelService.nextLevel()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.displayInAlert(err, 'Moving to next level')
      )
  }

  finish() {
    this.activeLevelService.finish()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.displayInAlert(err, 'Finishing training')
      )
  }
}
