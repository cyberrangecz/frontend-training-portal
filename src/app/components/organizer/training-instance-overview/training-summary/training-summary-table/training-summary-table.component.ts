import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRun} from "../../../../../model/training/training-run";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {ActiveTrainingInstanceService} from "../../../../../services/active-training-instance.service";
import {TrainingRunGetterService} from "../../../../../services/data-getters/training-run-getter.service";

@Component({
  selector: 'training-summary-table',
  templateUrl: './training-summary-table.component.html',
  styleUrls: ['./training-summary-table.component.css']
})
/**
 * Component for displaying summary of training in form of a material table
 */
export class TrainingSummaryTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sandboxId', 'playerId', 'state', 'actions'];
  trainingInstance: TrainingInstance;

  activeTrainingSubscription;

  dataSource: MatTableDataSource<TrainingRun>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activeTrainingInstanceService: ActiveTrainingInstanceService,
    private trainingRunGetter: TrainingRunGetterService) { }

  ngOnInit() {
    this.loadActiveTraining();
    this.subscribeActiveTrainingChanges();
    this.createDataSource();
  }

  ngOnDestroy() {
    if (this.activeTrainingSubscription) {
      this.activeTrainingSubscription.unsubscribe();
    }
  }

  /**
   * Loads active training (selected by user) from service
   */
  private loadActiveTraining() {
    this.trainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
  }

  /**
   * Subscribes to changes of active training. If active training is changes, reloads data and creates new data source
   */
  private subscribeActiveTrainingChanges() {
    this.activeTrainingSubscription = this.activeTrainingInstanceService.onActiveTrainingChanged
      .subscribe(change => {
        this.loadActiveTraining();
        this.createDataSource();
      })
  }

  /**
   *
   * @param {TrainingRun} training
   */
  revertTrainingRun(training: TrainingRun) {
    // TODO: Revert
  }

  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Creates table data source from training runs retrieved from a server.
   */
  private createDataSource() {
    if (this.trainingInstance) {
      this.trainingRunGetter.getTrainingRunsByTrainingInstanceId(this.trainingInstance.id)
        .subscribe(trainings => {
          this.dataSource = new MatTableDataSource(trainings);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.dataSource.filterPredicate =
            (data: TrainingRun, filter: string) =>
              data.state.toLowerCase().indexOf(filter) !== -1
        });
    }

  }

}
