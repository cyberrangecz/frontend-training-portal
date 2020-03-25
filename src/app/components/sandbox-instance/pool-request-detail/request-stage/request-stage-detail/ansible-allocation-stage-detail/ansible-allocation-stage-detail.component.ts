import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {KypoBaseComponent, KypoPaginatedResource, KypoPagination, KypoRequestedPagination} from 'kypo-common';
import {AnsibleAllocationStage} from '../../../../../../model/sandbox/pool/request/stage/ansible-allocation-stage';

@Component({
  selector: 'kypo2-ansible-allocation-stage-detail',
  templateUrl: './ansible-allocation-stage-detail.component.html',
  styleUrls: ['./ansible-allocation-stage-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnsibleAllocationStageDetailComponent extends KypoBaseComponent implements OnInit, OnChanges {

  @Input() stageDetail: AnsibleAllocationStage;
  @Output() fetchAnsibleOutput: EventEmitter<KypoRequestedPagination> = new EventEmitter();

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewport: CdkVirtualScrollViewport;

  isEnd = false;
  cachedPages: string[][] = [];
  flattenedPages: string[] = [];
  isLoading = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('stageDetail' in changes && this.stageDetail) {
      this.isLoading = false;
      if (!this.isAlreadyCached(this.stageDetail.output.pagination)) {
        this.addPageToCache(this.stageDetail.output.elements);
        this.flattenCachedPages();
      } else if (!this.isSameAsLastCache(this.stageDetail.output)) {
        this.refreshCache(this.stageDetail.output.pagination.page, this.stageDetail.output.elements);
        this.flattenCachedPages();
      }
      this.isEnd = this.resolveIsEnd(this.stageDetail);
    }
  }


  /**
   * Scrolls to the end of virtual scroll
   */
  scrollToEnd() {
    this.viewport.scrollToIndex(this.flattenedPages.length, 'auto');
  }

  /**
   * Scrolls to the start of virtual scroll
   */
  scrollToStart() {
    this.viewport.scrollToIndex(0, 'auto');
  }

  /**
   * Refreshes current page of training definitions
   */
  getNextPage() {
    this.isLoading = true;
    const requestedPage = this.stageDetail.output.pagination.page + 1;
    this.fetchAnsibleOutput.emit(new KypoRequestedPagination(requestedPage, 200, '',''));
  }

  private isAlreadyCached(pagination: KypoPagination): boolean {
    return pagination.page < this.cachedPages.length;
  }

  private addPageToCache(elements: string[]) {
    this.cachedPages.push(elements);
  }

  private refreshCache(page: number, elements: string[]) {
    this.cachedPages[page] = elements;
  }

  private resolveIsEnd(stage: AnsibleAllocationStage): boolean {
    return stage.output.pagination.page === stage.output.pagination.totalPages - 1;
  }

  private isSameAsLastCache(output: KypoPaginatedResource<string>) {
    return this.cachedPages[this.cachedPages.length - 1].length === output.elements.length;
  }

  private flattenCachedPages() {
    this.flattenedPages = Array.prototype.concat.apply([], this.cachedPages);
  }
}
