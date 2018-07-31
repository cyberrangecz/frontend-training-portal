import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingInstance} from "../../../../model/training/training-instance";
import {TrainingRun} from "../../../../model/training/training-run";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRunGetterService} from "../../../../services/data-getters/training-run-getter.service";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveUserService} from "../../../../services/active-user.service";
import {LevelGetterService} from "../../../../services/data-getters/level-getter.service";

export class TraineeAccessedTrainingsTableData {
  completedLevels: number;
  totalLevels: number;
  trainingRun: TrainingRun;
  trainingInstance: TrainingInstance;
}

@Component({
  selector: 'trainee-trainings-table',
  templateUrl: './trainee-trainings-table.component.html',
  styleUrls: ['./trainee-trainings-table.component.css']
})
export class TraineeTrainingsTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'completedLevels', 'actions'];

  now: number = Date.now();
  dataSource: MatTableDataSource<TraineeAccessedTrainingsTableData>;

  dataLoaded = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private activeUserService: ActiveUserService,
    private trainingRunGetter: TrainingRunGetterService,
    private trainingInstanceGetter: TrainingInstanceGetterService,
    private levelGetter: LevelGetterService) { }

  ngOnInit() {
    this.createDataSource();
  }

  tryAgain(trainingInstance: TrainingInstance) {
    // TODO: allocate new sandbox etc and get ID of training run
    const trainingRunId = 1;
    this.router.navigate(['training', trainingRunId, 'step'], {relativeTo: this.activeRoute});
  }

  accessResults(trainingRun: TrainingRun) {
    this.router.navigate(['training', trainingRun.id, 'step', { outlets: { game: ['results'] }}],{relativeTo: this.activeRoute})
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

  private createDataSource() {
    this.trainingRunGetter.getTrainingRunsByPlayerId(this.activeUserService.getActiveUser().id)
      .subscribe(trainingRuns => {
        const data: TraineeAccessedTrainingsTableData[] = [];

        trainingRuns.forEach(trainingRun => {
          const tableRow = new TraineeAccessedTrainingsTableData();
          tableRow.trainingRun = trainingRun;

          this.trainingInstanceGetter.getTrainingInstanceById(trainingRun.trainingInstanceId)
            .subscribe(trainingInstance => {
              tableRow.trainingInstance = trainingInstance;
              this.levelGetter.getLevelsByTrainingDefId(trainingInstance.trainingDefinitionId)
                .subscribe(
                  levels => tableRow.totalLevels = levels.length);
            });
          // TODO: GET completed levels
          data.push(tableRow);
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TraineeAccessedTrainingsTableData, filter: string) =>
            data.trainingInstance.title.toLowerCase().indexOf(filter) !== -1
      });
  }
}
