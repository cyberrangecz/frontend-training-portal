import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {merge} from 'rxjs';
import {startWith, takeWhile} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {AccessedTrainingRunsTableRow} from '../../../../model/table-adapters/accessed-training-runs-table-row';
import {TraineeAccessTrainingRunActionEnum} from '../../../../model/enums/trainee-access-training-run-actions.enum';
import {BaseComponent} from '../../../base.component';
import {StringNormalizer} from '../../../../model/utils/ignore-diacritics-filter';
import {LoadTableEvent} from '../../../../model/table-adapters/load-table-event';

@Component({
  selector: 'kypo2-training-run-table',
  templateUrl: './training-run-table.component.html',
  styleUrls: ['./training-run-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Presentational table component to display accessed training runs
 */
export class TrainingRunTableComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() hasError: boolean;
  @Input() trainingRuns: AccessedTrainingRunsTableRow[];
  @Input() totalElements: number;

  @Output() refresh: EventEmitter<LoadTableEvent> = new EventEmitter<LoadTableEvent>();
  @Output() resume: EventEmitter<number> = new EventEmitter<number>();
  @Output() results: EventEmitter<number> = new EventEmitter<number>();

  displayedColumns: string[] = ['title', 'date', 'completedLevels', 'actions'];
  dataSource: MatTableDataSource<AccessedTrainingRunsTableRow>;
  actionType = TraineeAccessTrainingRunActionEnum;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.initDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingRuns' in changes) {
      this.createDataSource();
    }
  }

  onResults(trainingRunId: number) {
    this.results.emit(trainingRunId);
  }

  onResume(trainingRunId: number) {
    this.resume.emit(trainingRunId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = StringNormalizer.normalizeDiacritics(filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initDataSource() {
    this.sort.sortChange
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  private fetchData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({})
      ).subscribe(_ => this.refresh.emit(new LoadTableEvent(
      {
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: this.resolveSortParam(this.sort.active),
        sortDir: this.sort.direction
      }))
    );
  }

  private resolveSortParam(tableHeader: string): string {
    return tableHeader === 'date' ? 'startTime' : tableHeader;
  }

  private createDataSource() {
    this.dataSource = new MatTableDataSource(this.trainingRuns);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (data: AccessedTrainingRunsTableRow, filter: string) =>
        data.normalizedTrainingInstanceTitle.indexOf(filter) !== -1;
  }
}
