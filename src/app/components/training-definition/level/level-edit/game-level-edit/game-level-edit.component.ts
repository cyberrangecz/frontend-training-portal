import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {GameLevel} from '../../../../../model/level/game-level';
import {AlertTypeEnum} from '../../../../../model/enums/alert-type.enum';
import {AlertService} from '../../../../../services/shared/alert.service';
import {HintStepperComponent} from './hint-edit/hint-stepper/hint-stepper.component';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {TrainingDefinitionFacade} from '../../../../../services/facades/training-definition-facade.service';
import {LevelEditService} from '../../../../../services/training-definition/level-edit.service';
import {BaseComponent} from '../../../../base.component';
import {takeWhile} from 'rxjs/operators';
import { GameLevelEditFormGroup } from './game-level-edit-form-group';

@Component({
  selector: 'kypo2-game-level-edit',
  templateUrl: './game-level-edit.component.html',
  styleUrls: ['./game-level-edit.component.css']
})
/**
 * Component for editing new or existing game level
 */
export class GameLevelEditComponent extends BaseComponent
  implements OnInit, OnChanges {
  @Input('level') level: GameLevel;
  @Input('trainingDefinitionId') trainingDefinitionId: number;
  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  @ViewChild(HintStepperComponent, { static: false })
  childComponent: HintStepperComponent;

  gameLevelConfigFormGroup: GameLevelEditFormGroup;
  isLoading = false;

  constructor(
    private alertService: AlertService,
    private levelService: LevelEditService,
    private errorHandler: ErrorHandlerService,
    private trainingDefinitionFacade: TrainingDefinitionFacade
  ) {
    super();
  }

  ngOnInit() {}

  get title() {
    return this.gameLevelConfigFormGroup.formGroup.get('title');
  }
  get content() {
    return this.gameLevelConfigFormGroup.formGroup.get('content');
  }
  get solution() {
    return this.gameLevelConfigFormGroup.formGroup.get('solution');
  }
  get maxScore() {
    return this.gameLevelConfigFormGroup.formGroup.get('maxScore');
  }
  get solutionPenalized() {
    return this.gameLevelConfigFormGroup.formGroup.get('solutionPenalized');
  }
  get incorrectFlagLimit() {
    return this.gameLevelConfigFormGroup.formGroup.get('incorrectFlagLimit');
  }
  get flag() {
    return this.gameLevelConfigFormGroup.formGroup.get('flag');
  }
  get estimatedDuration() {
    return this.gameLevelConfigFormGroup.formGroup.get('estimatedDuration');
  }
  get hints() {
    return this.gameLevelConfigFormGroup.formGroup.get('hints');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.gameLevelConfigFormGroup) {
      this.gameLevelConfigFormGroup = new GameLevelEditFormGroup();
    }
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return (
      !this.gameLevelConfigFormGroup.formGroup.dirty &&
      this.childComponent.canDeactivate()
    );
  }

  /**
   * Reacts on change in inputs, sets dirty to true
   */
  onContentChanged() {
    this.gameLevelConfigFormGroup.formGroup.markAsDirty();
  }

  setContentValue(event) {
    this.content.setValue(event);
  }

  setSolutionValue(event) {
    this.solution.setValue(event);
  }

  /**
   * Validates users input, sets input values to the game level object and calls REST API to save changes
   */
  saveChanges() {
    if (this.gameLevelConfigFormGroup.formGroup.valid) {
      this.isLoading = true;
      this.gameLevelConfigFormGroup.formGroup.disable();
      this.setInputValuesToLevel();
      this.childComponent.saveChanges();
      this.trainingDefinitionFacade
        .updateGameLevel(this.trainingDefinitionId, this.level)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
          resp => {
            this.gameLevelConfigFormGroup.formGroup.markAsPristine();
            this.isLoading = false;
            this.gameLevelConfigFormGroup.formGroup.enable();
            this.levelService.emitLevelUpdated(this.level);
            this.alertService.emitAlert(
              AlertTypeEnum.Success,
              'Game level was successfully saved'
            );
          },
          err => {
            this.isLoading = false;
            this.gameLevelConfigFormGroup.formGroup.enable();
            this.errorHandler.displayInAlert(
              err,
              'Saving game level "' + this.level.title + '"'
            );
          }
        );
    }
  }

  /**
   * Emits event saying that this level should be deleted
   */
  onDeleteLevel() {
    this.deleteLevel.emit(this.level.id);
  }

  /**
   * Sets user input values to the game level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title.value;
    this.level.content = this.content.value;
    this.level.solution = this.solution.value;
    this.level.maxScore = this.maxScore.value;
    this.level.flag = this.flag.value;
    this.level.solutionPenalized = this.solutionPenalized.value;
    this.level.incorrectFlagLimit = this.incorrectFlagLimit.value;
    this.level.estimatedDuration = this.estimatedDuration.value
      ? this.estimatedDuration.value
      : 60;
    this.estimatedDuration.setValue(this.level.estimatedDuration);
    this.hints.value.forEach((hint, index) => hint.order = index);
    this.level.hints = this.hints.value;
  }

  /**
   * Sets initial values from passed game level object to inputs (edit mode)
   */
  private setInitialValues() {
    if (this.level) {
      this.title.setValue(this.level.title);
      this.content.setValue(this.level.content);
      this.solution.setValue(this.level.solution);
      this.maxScore.setValue(this.level.maxScore);
      this.flag.setValue(this.level.flag);
      this.solutionPenalized.setValue(this.level.solutionPenalized);
      this.incorrectFlagLimit.setValue(this.level.incorrectFlagLimit);
      this.estimatedDuration.setValue(this.level.estimatedDuration);
      this.hints.setValue(this.level.hints);
    }
  }

  private childIsValid() {
    if (this.childComponent && this.childComponent.valid !== undefined) {
      return this.childComponent.valid;
    }
    return true;
  }
}
