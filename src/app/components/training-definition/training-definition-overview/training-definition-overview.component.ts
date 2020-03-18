import {Component, OnInit} from '@angular/core';
import {KypoBaseComponent, KypoRequestedPagination} from 'kypo-common';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {map, take, takeWhile} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionTable} from '../../../model/table/training-definition/training-definition-table';
import {TrainingDefinitionOverviewControls} from './training-definition-overview-controls';
import {KypoControlItem} from 'kypo-controls';


/**
 * Main smart component of training definition overview
 */
@Component({
  selector: 'kypo2-trainining-definition-overview',
  templateUrl: './training-definition-overview.component.html',
  styleUrls: ['./training-definition-overview.component.css']
})
export class TrainingDefinitionOverviewComponent extends KypoBaseComponent
  implements OnInit {

  readonly INIT_SORT_NAME = 'lastEdited';
  readonly INIT_SORT_DIR = 'desc';

  trainingDefinitions$: Observable<Kypo2Table<TrainingDefinition>>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  controls: KypoControlItem[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private trainingDefinitionService: TrainingDefinitionService) {
    super();
  }

  ngOnInit() {
    this.controls = TrainingDefinitionOverviewControls.create(this.trainingDefinitionService);
    this.initTable();
  }

  /**
   * Gets new data for table
   * @param loadEvent event emitted by table component to get new data
   */
  onLoadEvent(loadEvent: LoadTableEvent) {
    this.trainingDefinitionService.getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves controls action and calls appropriate handler
   * @param control selected control emitted by controls component
   */
  onControlsAction(control: KypoControlItem) {
    control.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  /**
   * Resolves type of emitted event and calls appropriate handler
   * @param event action event emitted from table component
   */
  onTableAction(event: TableActionEvent<TrainingDefinition>) {
    event.action.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  private initTable() {
    this.hasError$ = this.trainingDefinitionService.hasError$;
    this.isLoading$ = this.trainingDefinitionService.isLoading$;
    this.trainingDefinitions$ = this.trainingDefinitionService.resource$
      .pipe(
        map(resource => new TrainingDefinitionTable(resource, this.trainingDefinitionService))
      );
    const initialPagination = new KypoRequestedPagination(0, environment.defaultPaginationSize, this.INIT_SORT_NAME, this.INIT_SORT_DIR);
    this.onLoadEvent(new LoadTableEvent(initialPagination, null));
  }
}
