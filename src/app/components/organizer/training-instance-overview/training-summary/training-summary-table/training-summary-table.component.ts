import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRun} from "../../../../../model/training/training-run";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {ActiveTrainingInstanceService} from "../../../../../services/active-training-instance.service";
import {UserGetterService} from "../../../../../services/data-getters/user-getter.service";
import {SandboxDefinitionGetterService} from "../../../../../services/data-getters/sandbox-definition-getter.service";
import {TrainingRunGetterService} from "../../../../../services/data-getters/training-run-getter.service";

@Component({
  selector: 'training-summary-table',
  templateUrl: './training-summary-table.component.html',
  styleUrls: ['./training-summary-table.component.css']
})
export class TrainingSummaryTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sandboxId', 'playerId', 'state', 'actions'];
  trainingInstance: TrainingInstance;

  activeTrainingSubscription;

  dataSource: MatTableDataSource<TrainingRun>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activeTrainingInstanceService: ActiveTrainingInstanceService,
    private trainingRunGetter: TrainingRunGetterService,
    private userGetter: UserGetterService,
    private sandboxDefinitionGetter: SandboxDefinitionGetterService
  ) { }

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

  private loadActiveTraining() {
    this.trainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
  }

  private subscribeActiveTrainingChanges() {
    this.activeTrainingSubscription = this.activeTrainingInstanceService.onActiveTrainingChanged
      .subscribe(change => {
        this.loadActiveTraining();
        this.createDataSource();
      })
  }

  private createDataSource() {

  }

}
