import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {TrainingDefinitionInfo} from '../../../../model/training/training-definition-info';
import {KypoBaseComponent} from 'kypo-common';
import {TrainingDefinitionOrganizerSelectorService} from '../../../../services/training-instance/training-definition-selector/training-definition-organizer-selector.service';
import {RequestedPagination} from 'kypo2-table';
import {merge, Observable} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {takeWhile} from 'rxjs/operators';

/**
 * Popup dialog for associating training definitions with training instance
 */
@Component({
  selector: 'kypo2-training-definition-picker',
  templateUrl: './training-definition-selector.component.html',
  styleUrls: ['./training-definition-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'releasedService', useClass: TrainingDefinitionOrganizerSelectorService },
    { provide: 'unreleasedService', useClass: TrainingDefinitionOrganizerSelectorService }
  ]
})
export class TrainingDefinitionSelectorComponent extends KypoBaseComponent implements OnInit {

  released$: Observable<KypoPaginatedResource<TrainingDefinitionInfo>>;
  releasedHasError$: Observable<boolean>;
  unreleased$: Observable<KypoPaginatedResource<TrainingDefinitionInfo>>;
  unreleasedHasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected: TrainingDefinitionInfo;

  readonly pageSize = 10;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
              public dialogRef: MatDialogRef<TrainingDefinitionSelectorComponent>,
              @Inject('releasedService') private releasedService: TrainingDefinitionOrganizerSelectorService,
              @Inject('unreleasedService') private unreleasedService: TrainingDefinitionOrganizerSelectorService) {
    super();
    this.selected = this.data;
  }

  ngOnInit() {
    const pagination = new RequestedPagination(0, this.pageSize, 'title', 'asc');
    this.released$ = this.releasedService.resource$;
    this.releasedHasError$ = this.releasedService.hasError$;
    this.unreleased$ = this.unreleasedService.resource$;
    this.unreleasedHasError$ = this.unreleasedService.hasError$;
    this.isLoading$ = merge(this.releasedService.isLoading$, this.unreleasedService.isLoading$);
    this.releasedService.get(pagination, 'RELEASED')
      .subscribe();
    this.unreleasedService.get(pagination, 'UNRELEASED')
      .subscribe();
  }

  /**
   * Calls service to fetch training definitions
   * @param pagination requested pagination
   * @param released true if released training definitions should be fetched, false if unreleased
   */
  fetch(pagination: RequestedPagination, released: boolean) {
    if (released) {
      this.releasedService.get(pagination, 'RELEASED')
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    } else {
      this.unreleasedService.get(pagination, 'UNRELEASED')
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    }
  }

  /**
   * Closes the dialog window and passes the selected option to its parent component
   */
  confirm() {
    const result = {
      type: 'confirm',
      trainingDef: this.selected
    };
    this.dialogRef.close(result);
  }

  /**
   * Closes the dialog window without passing the selected option
   */
  cancel() {
    const result = {
      type: 'cancel',
      sandboxDef: null
    };
    this.dialogRef.close(result);
  }

  /**
   * Updated selected training definition
   * @param selected selected training definition
   */
  onSelectionChange(selected: TrainingDefinitionInfo) {
    this.selected = selected;
  }
}
