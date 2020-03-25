import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ListResourceMapping} from '../../../model/utils/list-resource-mapping';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';

/**
 * Displays training definitions list available for associating with a training instance
 */
@Component({
  selector: 'kypo-paginated-resource-list',
  templateUrl: './kypo-paginated-resource-list.component.html',
  styleUrls: ['./kypo-paginated-resource-list.component.scss']
})
export class KypoPaginatedResourceListComponent<T> implements OnInit, OnChanges {

  private readonly DEFAULT_RESOURCE_MAPPING: ListResourceMapping = { id: 'id', title: 'title' };

  @Input() sortByAttribute = 'title';
  @Input() sortDir: 'asc' | 'desc' = 'asc';
  @Input() resourceMapping = this.DEFAULT_RESOURCE_MAPPING;
  @Input() resourceName: string;
  @Input() selected: T;
  @Input() resource: KypoPaginatedResource<T>;
  @Input() hasError: boolean;
  @Input() pageSize: number;
  @Output() fetch: EventEmitter<KypoRequestedPagination> = new EventEmitter();
  @Output() selectionChange: EventEmitter<T> = new EventEmitter();

  cached: T[] = [];
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
      this.fetch.emit(new KypoRequestedPagination(this.page, this.pageSize, this.sortByAttribute, this.sortDir));
    }
  }

  /**
   * Emits event to fetch requested page
   */
  reload() {
    this.fetch.emit(new KypoRequestedPagination(this.page, this.pageSize, this.sortByAttribute, this.sortDir));
  }
}
