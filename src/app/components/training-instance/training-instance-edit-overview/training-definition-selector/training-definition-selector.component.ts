import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {TrainingDefinitionInfo} from '../../../../model/training/training-definition-info';
import {BaseComponent} from '../../../base.component';
import {SandboxDefinitionPickerComponent} from '../../../training-definition/training-definition-edit-overview/training-definition-edit/sandbox-definition-picker/sandbox-definition-picker.component';
import {TrainingDefinitionOrganizerSelectorService} from '../../../../services/training-instance/training-definition-selector/training-definition-organizer-selector.service';
import {RequestedPagination} from 'kypo2-table';
import {merge, Observable} from 'rxjs';
import {PaginatedResource} from '../../../../model/table/other/paginated-resource';
import {takeWhile} from 'rxjs/operators';

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
/**
 * Popup dialog to choose from training definition which will be associated with the training instance
 */
export class TrainingDefinitionSelectorComponent extends BaseComponent implements OnInit {

  released$: Observable<PaginatedResource<TrainingDefinitionInfo[]>>;
  releasedHasError$: Observable<boolean>;
  unreleased$: Observable<PaginatedResource<TrainingDefinitionInfo[]>>;
  unreleasedHasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  selected: TrainingDefinitionInfo;

  readonly pageSize = 10;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
              public dialogRef: MatDialogRef<SandboxDefinitionPickerComponent>,
              @Inject('releasedService') private releasedService: TrainingDefinitionOrganizerSelectorService,
              @Inject('unreleasedService') private unreleasedService: TrainingDefinitionOrganizerSelectorService) {
    super();
    this.selected = this.data;
  }

  ngOnInit() {
    const pagination = new RequestedPagination(0, this.pageSize, 'title', 'asc');
    this.released$ = this.releasedService.trainingDefinition$;
    this.releasedHasError$ = this.releasedService.hasError$;
    this.unreleased$ = this.unreleasedService.trainingDefinition$;
    this.unreleasedHasError$ = this.unreleasedService.hasError$;
    this.isLoading$ = merge(this.releasedService.isLoading$, this.unreleasedService.isLoading$);
    this.releasedService.get(pagination, 'RELEASED')
      .subscribe();
    this.unreleasedService.get(pagination, 'UNRELEASED')
      .subscribe();
  }

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

  onSelectionChange(selected: TrainingDefinitionInfo) {
    this.selected = selected;
  }
}
