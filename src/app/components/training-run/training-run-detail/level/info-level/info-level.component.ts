import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {InfoLevel} from '../../../../../model/level/info-level';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {RunningTrainingRunService} from '../../../../../services/training-run/running/running-training-run.service';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-info-level',
  templateUrl: './info-level.component.html',
  styleUrls: ['./info-level.component.css']
})
/**
 * Component to display training run's level of type INFO. Only displays markdown and allows user to continue immediately.
 */
export class InfoLevelComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('level') level: InfoLevel;
  hasNextLevel: boolean;

  constructor(private activeLevelService: RunningTrainingRunService,
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

  /**
   * Calls service to move to the next level of the training run
   */
  nextLevel() {
    this.activeLevelService.nextLevel()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.emit(err, 'Moving to next level')
      );
  }

  /**
   * Calls service to finish training run
   */
  finish() {
    this.activeLevelService.finish()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {},
        err => this.errorHandler.emit(err, 'Finishing training')
      );
  }
}
