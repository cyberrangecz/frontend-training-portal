import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {SandboxDefinitionPickerComponent} from './sandbox-definition-picker/sandbox-definition-picker.component';
import { MatDialog } from '@angular/material/dialog';
import {AuthorsPickerComponent} from './authors-picker/authors-picker.component';
import {EditBetaTestingGroupComponent} from './edit-beta-testing-group/edit-beta-testing-group.component';
import { User} from 'kypo2-auth';
import {BaseComponent} from '../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { TrainingDefinitionEditFormGroup } from './training-definition-edit-form-group';
import {TrainingDefinitionChangeEvent} from '../../../../model/events/training-definition-change-event';

/**
 * Component for creating new or editing already existing training definition
 */
@Component({
  selector: 'kypo2-training-definition-edit',
  templateUrl: './training-definition-edit.component.html',
  styleUrls: ['./training-definition-edit.component.css']
})
export class TrainingDefinitionEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() trainingDefinition: TrainingDefinition;
  @Input() activeUser: User;
  @Output() edited: EventEmitter<TrainingDefinitionChangeEvent> = new EventEmitter();

  trainingDefinitionEditFormGroup: TrainingDefinitionEditFormGroup;

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
  }

  get title() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('title');
  }
  get description() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('description');
  }
  get prerequisites() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('prerequisites');
  }
  get outcomes() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('outcomes');
  }
  get authors() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('authors');
  }
  get sandboxDefId() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('sandboxDefId');
  }
  get showProgress() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('showProgress');
  }
  get betaTestingGroup() {
    return this.trainingDefinitionEditFormGroup.formGroup.get('betaTestingGroup');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
      this.trainingDefinitionEditFormGroup = new TrainingDefinitionEditFormGroup(this.trainingDefinition);
      this.setupOnFormChangedEvent();
    }
  }

  /**
   * Displays dialog window with list of authors and assigns selected authors to the training definition
   */
  chooseAuthors() {
    const dialogRef = this.dialog.open(AuthorsPickerComponent, {
      data: this.authors.value
    });

    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.authors.setValue(result.authors);
          this.authors.markAsDirty();
        }
      });
  }

  chooseBetaTestingGroup() {
    const dialogRef = this.dialog.open(EditBetaTestingGroupComponent, {
      data: this.betaTestingGroup.value
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.betaTestingGroup.setValue(result.betaTestingGroup);
        this.betaTestingGroup.markAsDirty();
      }
    });
  }

  /**
   * Displays dialog window with list of sandbox definitions and assigns selected sandbox definition to the training definition
   */
  chooseSandboxDefs() {
    const dialogRef = this.dialog.open(SandboxDefinitionPickerComponent, {
      data: this.sandboxDefId.value
    });
    dialogRef
      .afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.sandboxDefId.setValue(result.sandboxDef.id);
          this.sandboxDefId.markAsDirty();
        }
      });
  }

  private setupOnFormChangedEvent() {
    this.trainingDefinitionEditFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(_ => this.onChanged());
  }

  private onChanged() {
    this.trainingDefinitionEditFormGroup.setValuesToTrainingDefinition(this.trainingDefinition);
    this.edited.emit(new TrainingDefinitionChangeEvent(
      this.trainingDefinition,
      this.trainingDefinitionEditFormGroup.formGroup.valid)
    );
  }
}
