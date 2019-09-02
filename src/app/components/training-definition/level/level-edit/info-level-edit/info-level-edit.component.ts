import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InfoLevel} from '../../../../../model/level/info-level';
import {AlertTypeEnum} from '../../../../../model/enums/alert-type.enum';
import {AlertService} from '../../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {TrainingDefinitionFacade} from '../../../../../services/facades/training-definition-facade.service';
import {LevelEditService} from '../../../../../services/training-definition/level-edit.service';
import {BaseComponent} from '../../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { InfoLevelConfigFormGroup } from './info-level-edit-form-group';

@Component({
  selector: 'kypo2-info-level-configuration',
  templateUrl: './info-level-edit.component.html',
  styleUrls: ['./info-level-edit.component.css']
})
/**
 * Component for editing of new or existing info level
 */
export class InfoLevelEditComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('level') level: InfoLevel;
  @Input('trainingDefinitionId') trainingDefinitionId: number;

  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  infoLevelConfigFormGroup: InfoLevelConfigFormGroup;

  isLoading = false;

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
              private levelService: LevelEditService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }


  ngOnInit() {
  }


  get title() {return this.infoLevelConfigFormGroup.formGroup.get('title'); }
  get content() {return this.infoLevelConfigFormGroup.formGroup.get('content'); }


  ngOnChanges(changes: SimpleChanges) {
    if (!this.infoLevelConfigFormGroup) {
      this.infoLevelConfigFormGroup = new InfoLevelConfigFormGroup();
    }
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Emits event saying that this level should be deleted
   */
  onDeleteLevel() {
    this.deleteLevel.emit(this.level.id);
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.infoLevelConfigFormGroup.formGroup.dirty;
  }

  /**
   * Validates and saves input values to the level object and calls REST API of server to save changes
   */
  saveChanges() {
    if (this.infoLevelConfigFormGroup.formGroup.valid) {
      this.isLoading = true;
      this.infoLevelConfigFormGroup.formGroup.disable();
      this.setInputValuesToLevel();
      this.trainingDefinitionFacade.updateInfoLevel(this.trainingDefinitionId, this.level)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(resp => {
          this.isLoading = false;
          this.infoLevelConfigFormGroup.formGroup.enable();
          this.infoLevelConfigFormGroup.formGroup.markAsPristine();
          this.levelService.emitLevelUpdated(this.level);
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Info level was successfully saved');
        },
  err => {
          this.isLoading = false;
          this.infoLevelConfigFormGroup.formGroup.enable();
          this.errorHandler.displayInAlert(err, 'Updating info level "' + this.level.title + '"');
            });
    }
  }

  /**
   * Reacts on change in inputs. Sets dirty to true
   */
  contentChanged() {
    this.infoLevelConfigFormGroup.formGroup.markAsDirty();
  }

  setContentValue(event) {
    this.content.setValue(event);
  }

  /**
   * Sets input values to the info level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title.value;
    this.level.content = this.content.value;
  }

  /**
   * Sets initial values to inputs from info level object (edit mode)
   */
  private setInitialValues() {
    if (this.level) {
      this.title.setValue(this.level.title);
      this.content.setValue(this.level.content);
    }
  }

}
