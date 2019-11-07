import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TrainingDefinitionInfo} from '../../../../../model/training/training-definition-info';
import {PaginatedResource} from '../../../../../model/table-adapters/paginated-resource';
import {RequestedPagination} from 'kypo2-table';

@Component({
  selector: 'kypo2-training-definition-list-content',
  templateUrl: './training-definition-list-content.component.html',
  styleUrls: ['./training-definition-list-content.component.scss']
})
export class TrainingDefinitionListContentComponent implements OnInit, OnChanges {

  @Input() state: string;
  @Input() selected: TrainingDefinitionInfo;
  @Input() resource: PaginatedResource<TrainingDefinitionInfo[]>;
  @Input() hasError: boolean;
  @Input() pageSize: number;
  @Output() fetch: EventEmitter<RequestedPagination> = new EventEmitter();
  @Output() selectionChange: EventEmitter<TrainingDefinitionInfo> = new EventEmitter();

  cached: TrainingDefinitionInfo[] = [];
  resourceLoaded = false;

  isEnd = false;
  private page = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('resource' in changes && this.resource) {
      this.resourceLoaded = true;
      this.cached = this.cached.concat(this.resource.elements);
      this.page = this.resource.pagination.page;
      this.isEnd = this.resource.pagination.page === this.resource.pagination.totalPages - 1;
    }
  }

  getNextPage() {
    if (this.isEnd || !this.resource) {
      return;
    } else {
      this.page += 1;
      this.fetch.emit(new RequestedPagination(this.page, this.pageSize, 'title', 'asc'));
    }
  }

  trackById(i) {
    return i.id;
  }

  reload() {
    this.fetch.emit(new RequestedPagination(this.page, this.pageSize, 'title', 'asc'));
  }
}
