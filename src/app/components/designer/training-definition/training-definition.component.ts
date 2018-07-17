import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionLoaderService} from "../../../services/data-loaders/training-definition-loader.service";
import {TrainingDefinition} from "../../../model/training/training-definition";
import {ActiveUserService} from "../../../services/active-user.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingDefinitionStateEnum} from "../../../enums/training-definition-state.enum";

@Component({
  selector: 'designer-training-definition',
  templateUrl: './training-definition.component.html',
  styleUrls: ['./training-definition.component.css']
})
export class TrainingDefinitionComponent implements OnInit {

  // needed to compare against enums in template
  trainingStateEnum = TrainingDefinitionStateEnum;

  displayedColumns: string[] = ['title', 'description', 'status', 'authors', 'actions'];

  dataSource: MatTableDataSource<TrainingDefinition>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activeUserService: ActiveUserService,
    private trainingDefinitionLoader: TrainingDefinitionLoaderService) {
    this.createTableDataSource();
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newTrainingDefinition() {

  }

  uploadTrainingDefinition() {

  }

  editTrainingDefinition(id: number) {
    console.log(id);

  }

  downloadTrainingDefinition(id: number) {
    console.log(id);

  }

  removeTrainingDefinition(id: number) {
    console.log(id);
  }

  cloneTrainingDefinition(id: number) {
    console.log(id);
  }

  archiveTrainingDefinition(id: number) {
    console.log(id);
  }

  private createTableDataSource() {
    this.trainingDefinitionLoader.getTrainingDefsByUser(this.activeUserService.getActiveUser())
      .subscribe(trainings => {

        this.dataSource = new MatTableDataSource(trainings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingDefinition, filter: string) =>
            data.title.toLowerCase().indexOf(filter) !== -1
            || data.state.toLowerCase().indexOf(filter) !== -1;
      });
  }

}
