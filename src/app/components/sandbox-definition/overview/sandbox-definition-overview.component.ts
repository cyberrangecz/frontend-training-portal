import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';
import {SandboxDefinitionOverviewService} from '../../../services/sandbox-definition/sandbox-definition-overview.service';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {SandboxDefinitionTableCreator} from '../../../model/table/factory/sandbox-definition-table-creator';
import {SandboxDefinition} from '../../../model/sandbox/definition/sandbox-definition';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {ControlButton} from '../../../model/controls/control-button';
import {SandboxDefinitionOverviewControls} from './sandbox-definition-overview-controls';

@Component({
  selector: 'kypo2-sandbox-definition-overview',
  templateUrl: './sandbox-definition-overview.component.html',
  styleUrls: ['./sandbox-definition-overview.component.scss'],
})

/**
 * Component displaying overview of sandbox definitions. Contains button for create sandbox definitions,
 * table with all sandbox definitions and possible actions on sandbox definition.
 */
export class SandboxDefinitionOverviewComponent extends BaseComponent implements OnInit {

  controls: ControlButton[];
  sandboxDefinitions$: Observable<Kypo2Table<SandboxDefinition>>;
  hasError$: Observable<boolean>;

  private lastLoadEvent: LoadTableEvent;

  constructor(private router: Router,
              private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
              private sandboxDefinitionService: SandboxDefinitionOverviewService
              ) {
    super();
  }

  ngOnInit() {
    this.controls = SandboxDefinitionOverviewControls.create(this.sandboxDefinitionService);
    this.initTable();
  }

  /**
   * Refreshes table with new data
   * @param event to load data
   */
  onLoadEvent(event: LoadTableEvent) {
    this.sandboxDefinitionService.getAll(event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves correct action based on received event and performs it
   * @param event table action event emitted by child table component
   */
  onTableAction(event: TableActionEvent<SandboxDefinition>) {
    if (event.action.id === SandboxDefinitionTableCreator.DELETE_ACTION_ID) {
      this.sandboxDefinitionService.delete(event.element);
    }
  }

  /**
   * Navigates to create sandbox definition page
   */
  onControlsActions(control: ControlButton) {
    control.action$
      .pipe(
        take(1)
      ).subscribe();
  }

  private initTable() {
    this.sandboxDefinitions$ = this.sandboxDefinitionService.resource$
      .pipe(
        map(paginatedSandboxes => SandboxDefinitionTableCreator.create(paginatedSandboxes))
      );
    this.lastLoadEvent = new LoadTableEvent(new RequestedPagination(0, environment.defaultPaginationSize, '', ''), null);
    this.onLoadEvent(this.lastLoadEvent);
    this.hasError$ = this.sandboxDefinitionService.hasError$;
  }
}
