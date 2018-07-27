import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {AlertService} from "../../../../services/event-services/alert.service";
import {ActiveUserService} from "../../../../services/active-user.service";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {TrainingEditPopupComponent} from "./training-edit-popup/training-edit-popup.component";
import {TrainingDeleteDialogComponent} from "./training-delete-dialog/training-delete-dialog.component";

@Component({
  selector: 'training-instances-list',
  templateUrl: './training-instances-list.component.html',
  styleUrls: ['./training-instances-list.component.css']
})
export class TrainingInstancesListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'state', 'poolSize', 'password', 'actions'];

  dataSource: MatTableDataSource<TrainingInstance>;

  now: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private activeUserService: ActiveUserService,
    private trainingInstanceGetter: TrainingInstanceGetterService
  ) { }

  ngOnInit() {
    this.now = Date.now();
    this.createTableDataSource();
  }

  refreshData() {
    this.now = Date.now();
    this.createTableDataSource();
  }

  editTraining(training: TrainingInstance) {
    const dialogRef = this.dialog.open(TrainingEditPopupComponent, {
      data: training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.refreshData();
      }
    });  }

  removeTraining(training: TrainingInstance) {
    const dialogRef = this.dialog.open(TrainingDeleteDialogComponent, {
      data: training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        const index = this.dataSource.data.indexOf(training);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
        }
        this.dataSource = new MatTableDataSource<TrainingInstance>(this.dataSource.data);
        // TODO: call REST API to remove from db
      }
    });  }

  archiveTraining(training: TrainingInstance) {
    // TODO: call rest to download all training instances data
  }

  allocateTraining(trainign: TrainingInstance) {
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
        this.dataSource = new MatTableDataSource(trainings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingInstance, filter: string) =>
            data.title.toLowerCase().indexOf(filter) !== -1
      });
  }

}
