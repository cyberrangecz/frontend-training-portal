import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TrainingDefinitionInfo} from '../../../../../model/training/training-definition-info';
import {PaginatedResource} from '../../../../../model/table/other/paginated-resource';
import {RequestedPagination} from 'kypo2-table';

/**
 * Displays training definitions list available for associating with a training instance
 */
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

  /**
   * Emits event to get next page of training definitions
   */
  getNextPage() {
    if (this.isEnd || !this.resource) {
      return;
    } else {
      this.page += 1;
      this.fetch.emit(new RequestedPagination(this.page, this.pageSize, 'title', 'asc'));
    }
  }

  /**
   * Tracking function to improve *ngFor performance
   * @param trainingDefinition tracked training definition
   */
  trackById(trainingDefinition: TrainingDefinitionInfo) {
    return trainingDefinition.id;
  }

  /**
   * Refreshes current page of training definitions
   */
  reload() {
    this.fetch.emit(new RequestedPagination(this.page, this.pageSize, 'title', 'asc'));
  }
}
