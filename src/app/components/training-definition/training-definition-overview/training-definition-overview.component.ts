import {TrainingDefinitionStateEnum} from '../../../model/enums/training-definition-state.enum';
import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {TrainingDefinitionService} from '../../../services/training-definition/overview/training-definition.service';
import {map, take, takeWhile} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionTableCreator} from '../../../model/table/factory/training-definition-table-creator';
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
export class TrainingDefinitionOverviewComponent extends BaseComponent
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
    let action$: Observable<any>;
    switch (event.action.id) {
      case TrainingDefinitionTableCreator.CLONE_ACTION_ID:
        action$ = this.trainingDefinitionService.clone(event.element);
        break;
      case TrainingDefinitionTableCreator.DOWNLOAD_ACTION_ID:
        action$ = this.trainingDefinitionService.download(event.element);
        break;
      case TrainingDefinitionTableCreator.PREVIEW_ACTION_ID:
        action$ = this.trainingDefinitionService.preview(event.element);
        break;
      case TrainingDefinitionTableCreator.EDIT_ACTION_ID:
        action$ = this.trainingDefinitionService.edit(event.element);
        break;
      case TrainingDefinitionTableCreator.DELETE_ACTION_ID:
        action$ = this.trainingDefinitionService.delete(event.element);
        break;
      case TrainingDefinitionTableCreator.RELEASE_ACTION_ID:
        action$ = this.trainingDefinitionService.changeState(event.element, TrainingDefinitionStateEnum.Released);
        break;
      case TrainingDefinitionTableCreator.UNRELEASE_ACTION_ID:
        action$ = this.trainingDefinitionService.changeState(event.element, TrainingDefinitionStateEnum.Unreleased);
        break;
      case TrainingDefinitionTableCreator.ARCHIVE_ACTION_ID:
        action$ = this.trainingDefinitionService.changeState(event.element, TrainingDefinitionStateEnum.Archived);
        break;
    }

    action$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  private initTable() {
    this.hasError$ = this.trainingDefinitionService.hasError$;
    this.isLoading$ = this.trainingDefinitionService.isLoading$;
    this.trainingDefinitions$ = this.trainingDefinitionService.resource$
      .pipe(
        map(tds => TrainingDefinitionTableCreator.create(tds))
      );

    const initialPagination = new RequestedPagination(0, environment.defaultPaginationSize, this.INIT_SORT_NAME, this.INIT_SORT_DIR);
    this.onLoadEvent(new LoadTableEvent(initialPagination, null));
  }
}
