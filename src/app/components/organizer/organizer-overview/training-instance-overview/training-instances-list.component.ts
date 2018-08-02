import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {AlertService} from "../../../../services/event-services/alert.service";
import {ActiveUserService} from "../../../../services/active-user.service";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {TrainingEditPopupComponent} from "./training-edit-popup/training-edit-popup.component";
import {TrainingDeleteDialogComponent} from "./training-delete-dialog/training-delete-dialog.component";
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";

export class TrainingInstancesTableDataSource {
  trainingDefinitionTitle: string;
  trainingInstance: TrainingInstance;
}

@Component({
  selector: 'training-instances-list',
  templateUrl: './training-instances-list.component.html',
  styleUrls: ['./training-instances-list.component.css']
})
/**
 * Component for list of training instance displayed in form of a table. Only training instances where the active user is listed as an organizer is shown
 */
export class TrainingInstancesListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'trainingDefinition', 'poolSize', 'password', 'actions'];

  dataSource: MatTableDataSource<TrainingInstancesTableDataSource>;

  now: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private activeUserService: ActiveUserService,
    private trainingInstanceGetter: TrainingInstanceGetterService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService
  ) { }

  ngOnInit() {
    this.now = Date.now();
    this.createTableDataSource();
  }

  /**
   * Reloads data and creates new table data source
   */
  refreshData() {
    this.now = Date.now();
    this.createTableDataSource();
  }

  /**
   * Opens popup dialog with component for editing existing training instance
   * @param {TrainingInstance} training training instance which should be edited
   */
  editTraining(training: TrainingInstance) {
    const dialogRef = this.dialog.open(TrainingEditPopupComponent, {
      data: training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.refreshData();
      }
    });  }

  /**
   * Opens popup dialog to confirm if the user really wants to delete the training instance. If the action is
   * confirmed, training instance is removed and REST API called to remove training from endpoint
   * @param {TrainingInstancesTableDataSource} training training instance which should be removed
   */
  removeTraining(training: TrainingInstancesTableDataSource) {
    const dialogRef = this.dialog.open(TrainingDeleteDialogComponent, {
      data: training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        const index = this.dataSource.data.indexOf(training);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
        }
        this.dataSource = new MatTableDataSource<TrainingInstancesTableDataSource>(this.dataSource.data);
        // TODO: call REST API to remove from db
      }
    });  }

  /**
   *
   * @param {TrainingInstance} training
   */
  archiveTraining(training: TrainingInstance) {
    // TODO: call rest to download all training instances data
  }

  /**
   *
   * @param {TrainingInstance} training
   */
  allocateTraining(training: TrainingInstance) {
    // TODO: call REST to allocate number of sandboxes (pool size)
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
   * Creates table data source from training instances retrieved from a server. Only training instances where
   * active user is listed as an organizer are shown
   */
  private createTableDataSource() {
    this.trainingInstanceGetter.getTrainingInstancesByOrganizersId(this.activeUserService.getActiveUser().id)
      .subscribe(trainings => {
        const data: TrainingInstancesTableDataSource[] = [];
        trainings.forEach(training => {
          const tableRow = new TrainingInstancesTableDataSource();
          tableRow.trainingInstance = training;

          this.trainingDefinitionGetter.getTrainingDefById(training.id)
            .subscribe(trainingDef =>
              tableRow.trainingDefinitionTitle = trainingDef.title);

          data.push(tableRow);
        });

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingInstancesTableDataSource, filter: string) =>
            data.trainingInstance.title.toLowerCase().indexOf(filter) !== -1
      });
  }

}
