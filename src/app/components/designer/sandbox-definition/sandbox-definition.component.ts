import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SandboxDefinition} from "../../../model/sandbox/sandbox-definition";
import {ActiveUserService} from "../../../services/active-user.service";
import {TrainingDefinition} from "../../../model/training/training-definition";
import {SandboxDefinitionLoaderService} from "../../../services/data-loaders/sandbox-definition-loader.service";
import {TrainingDefinitionLoaderService} from "../../../services/data-loaders/training-definition-loader.service";
import {Dictionary} from "typescript-collections";

@Component({
  selector: 'designer-sandbox-definition',
  templateUrl: './sandbox-definition.component.html',
  styleUrls: ['./sandbox-definition.component.css']
})
export class SandboxDefinitionComponent implements OnInit {

  displayedColumns: string[] = ['title', 'associatedTrainingDefs', 'authors', 'actions'];

  dataSource: MatTableDataSource<SandboxDefinition>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activeUserService: ActiveUserService,
    private trainingDefinitionLoader: TrainingDefinitionLoaderService,
    private sandboxDefinitionLoader: SandboxDefinitionLoaderService
  ) {
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

  removeSandboxDefinition(id: number) {
  }

  updateSandboxDefinition(id: number) {
  }

  deploySandboxDefinition(id: number) {
  }

  private createTableDataSource() {
    this.sandboxDefinitionLoader.getSandboxDefsByUserId(this.activeUserService.getActiveUser().id)
      .subscribe(sandboxes => {
        this.dataSource = new MatTableDataSource(sandboxes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingDefinition, filter: string) =>
            data.title.toLowerCase().indexOf(filter) !== -1
      });
  }

}
