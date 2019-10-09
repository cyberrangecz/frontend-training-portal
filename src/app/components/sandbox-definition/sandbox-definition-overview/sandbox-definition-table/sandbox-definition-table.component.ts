import {animate, state, style, transition, trigger} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {merge} from 'rxjs';
import {startWith, takeWhile} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {LoadTableEvent} from '../../../../model/table-adapters/load-table-event';
import {SandboxDefinitionTableRow} from '../../../../model/table-adapters/sandbox-definition-table-row';
import {StringNormalizer} from '../../../../model/utils/ignore-diacritics-filter';
import {BaseComponent} from '../../../base.component';

@Component({
  selector: 'kypo2-sandbox-definition-table',
  templateUrl: './sandbox-definition-table.component.html',
  styleUrls: ['./sandbox-definition-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SandboxDefinitionTableComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() displayedColumns: Array<string>;
  @Input() isInErrorState: boolean;
  @Input() totalElements: number;
  @Input() sandboxDefinitions: SandboxDefinitionTableRow[];

  @Output() refresh: EventEmitter<LoadTableEvent> = new EventEmitter<LoadTableEvent>();
  @Output() sandboxDefinitionDelete: EventEmitter<SandboxDefinitionTableRow> = new EventEmitter();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<SandboxDefinitionTableRow>;
  expandedSandboxDefinition: SandboxDefinitionTableRow;

  constructor() { super(); }

  ngOnInit() {
    this.initDataSource();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('sandboxDefinitions' in changes) {
      this.createDataSource();
    }
  }

  deleteSandboxDefinition(sandboxRow: SandboxDefinitionTableRow) {
    this.sandboxDefinitionDelete.emit(sandboxRow);
  }

  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = StringNormalizer.normalizeDiacritics(filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private initDataSource() {
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.fetchData();
  }

  private fetchData() {
    merge(this.paginator.page, this.paginator.pageSize)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({})
      ).subscribe(_ => this.refresh.emit(new LoadTableEvent(
      {
        page: this.paginator.pageIndex,
        size: this.paginator.pageSize,
        sort: '',
        sortDir: ''
      }))
    );
  }

  /**
   * Creates data source from sandbox definiton table data objects
   */
  private createDataSource() {
    this.dataSource = new MatTableDataSource(this.sandboxDefinitions);

    this.dataSource.filterPredicate =
      (data: SandboxDefinitionTableRow, filter: string) =>
        data.normalizedTitle.indexOf(filter) !== -1;
  }
}
