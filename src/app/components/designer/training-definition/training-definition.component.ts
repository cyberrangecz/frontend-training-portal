import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionLoaderService} from "../../../services/data-loaders/training-definition-loader.service";
import {TrainingDefinition} from "../../../model/training/training-definition";
import {ActiveUserService} from "../../../services/active-user.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'designer-training-definition',
  templateUrl: './training-definition.component.html',
  styleUrls: ['./training-definition.component.css']
})
export class TrainingDefinitionComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'status', 'authors', 'actions'];

  dataSource: MatTableDataSource<TrainingDefinition>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activeUserService: ActiveUserService,
    private trainingDefinitionLoader: TrainingDefinitionLoaderService) {

    this.trainingDefinitionLoader.getTrainingDefsByUser(this.activeUserService.getActiveUser())
      .subscribe(trainings => {
        this.dataSource = new MatTableDataSource(trainings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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

  deleteTrainingDefinition(id: number) {
    console.log(id);
  }

}
