import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {KypoControlItem} from 'kypo-controls';
import {map, take, takeWhile, tap} from 'rxjs/operators';
import {Pool} from 'kypo-sandbox-model';
import {Observable} from 'rxjs';
import {TrainingInstance} from 'kypo-training-model';
import {PoolAssignService} from '../../../../services/training-instance/pool-assign/pool-assign.service';
import {PoolAssignControls} from './pool-assign-controls';
import {PoolAssignConcreteService} from '../../../../services/training-instance/pool-assign/pool-assign-concrete.service';
import {KypoBaseComponent, KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {environment} from '../../../../../environments/environment';
import {SandboxPoolListAdapter} from '../../../../model/list/sandbox-pool-list-adapter';
import {SandboxNavigator} from 'kypo-sandbox-agenda';
import {KypoListResourceMapping} from 'kypo-list';

@Component({
  selector: 'kypo2-pool-assign',
  templateUrl: './pool-assign.component.html',
  styleUrls: ['./pool-assign.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: PoolAssignService, useClass: PoolAssignConcreteService }
  ]
})
export class PoolAssignComponent extends KypoBaseComponent implements OnInit, OnChanges {

  readonly PAGE_SIZE = environment.defaultPaginationSize;

  @Input() trainingInstance: TrainingInstance;
  @Output() poolChanged: EventEmitter<TrainingInstance> = new EventEmitter();

  pools$: Observable<KypoPaginatedResource<SandboxPoolListAdapter>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected$: Observable<SandboxPoolListAdapter>;

  controls: KypoControlItem[];
  resourceMapping: KypoListResourceMapping = {id: 'id', title: 'title'};
  poolDetailRoute: string;
  hasPool$: Observable<boolean>;

  constructor(private assignService: PoolAssignService,
              private sandboxNavigator: SandboxNavigator) {
    super();
  }

  ngOnInit(): void {
    this.initList();
    this.initControls();
    this.hasPool$ = this.assignService.assignedPool$
      .pipe(
        takeWhile(_ => this.isAlive),
        tap(poolId => this.onPoolChanged(poolId)),
        map(poolId => poolId !== undefined && poolId !== null)
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      this.assignService.init(this.trainingInstance);
      this.initControls();
      this.poolDetailRoute = `/${this.sandboxNavigator.toPool(this.trainingInstance.poolId)}`;
    }
  }

  onControlsAction(controlItem: KypoControlItem) {
    controlItem.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  fetch(pagination: KypoRequestedPagination) {
    this.assignService.getAll(pagination)
      .pipe(
        take(1)
      ).subscribe();
  }

  onSelectionChange(selected: SandboxPoolListAdapter) {
    this.assignService.select(selected.pool);
  }

  private initList() {
    const pagination = new KypoRequestedPagination(0, this.PAGE_SIZE, '', '');
    this.pools$ = this.assignService.resource$
      .pipe(
        map(resource => this.mapToAdapter(resource))
      );
    this.hasError$ = this.assignService.hasError$;
    this.isLoading$ = this.assignService.isLoading$;
    this.selected$ = this.assignService.selected$
      .pipe(
        map(selected => selected ? new SandboxPoolListAdapter(selected) : undefined)
      );
    this.assignService.getAll(pagination)
      .pipe(
        take(1)
      ).subscribe();
  }

  private onPoolChanged(poolId: number) {
    this.trainingInstance.poolId = poolId;
    this.poolChanged.emit(this.trainingInstance);
    this.initControls();
  }

  private initControls() {
    this.controls = PoolAssignControls.create(this.assignService, this.trainingInstance);
  }

  private mapToAdapter(resource: KypoPaginatedResource<Pool>): KypoPaginatedResource<SandboxPoolListAdapter> {
    const adapterElements = resource.elements.map(pool => new SandboxPoolListAdapter(pool));
    return new KypoPaginatedResource<SandboxPoolListAdapter>(adapterElements, resource.pagination)
  }
}
