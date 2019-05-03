import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {GameLevel} from "../../../../../../model/level/game-level";
import {AlertTypeEnum} from "../../../../../../model/enums/alert-type.enum";
import {AlertService} from "../../../../../../services/shared/alert.service";
import {Hint} from "../../../../../../model/level/hint";
import {HintStepperComponent} from "../hints/hint-stepper/hint-stepper.component";
import {ErrorHandlerService} from "../../../../../../services/shared/error-handler.service";
import {TrainingDefinitionFacade} from "../../../../../../services/facades/training-definition-facade.service";
import {LevelsDefinitionService} from "../../../../../../services/designer/levels-definition.service";

@Component({
  selector: 'game-level-configuration',
  templateUrl: './game-level-configuration.component.html',
  styleUrls: ['./game-level-configuration.component.css']
})
/**
 * Component for configuration of new or existing game level
 */
export class GameLevelConfigurationComponent implements OnInit, OnChanges {

  @Input('level') level: GameLevel;
  @Input('trainingDefinitionId') trainingDefinitionId: number;
  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  @ViewChild(HintStepperComponent) childComponent: HintStepperComponent;


  title: string;
  content: string;
  solution: string;
  maxScore: number;
  solutionPenalized: boolean;
  incorrectFlagLimit: number;
  flag: string;
  estimatedDuration: number;
  hints: Hint[];

  dirty = false;
  isLoading = false;

  constructor(private alertService: AlertService,
              private levelService: LevelsDefinitionService,
              private errorHandler: ErrorHandlerService,
              private trainingDefinitionFacade: TrainingDefinitionFacade) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('level' in changes) {
      this.setInitialValues();
    }
  }

  /**
   * Determines whether the user has saved all his work and can leave the component
   * @returns {boolean} true does not have any unsaved changes, false otherwise
   */
  canDeactivate(): boolean {
    return !this.dirty && this.childComponent.canDeactivate();
  }

  /**
   * Reacts on change in inputs, sets dirty to true
   */
  onContentChanged() {
    this.dirty = true;
  }

  /**
   * Validates users input, sets input values to the game level object and calls REST API to save changes
   */
  saveChanges() {
    if (this.validateChanges()) {
      this.isLoading = true;
      this.setInputValuesToLevel();
      this.childComponent.saveChanges();
      this.trainingDefinitionFacade.updateGameLevel(this.trainingDefinitionId, this.level)
        .subscribe(resp => {
          this.dirty = false;
          this.isLoading = false;
          this.levelService.emitLevelUpdated(this.level);
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Game level was successfully saved');
        },
          err => {
            this.isLoading = false;
            this.errorHandler.displayHttpError(err, 'Saving game level "' + this.level.title + '"');
          });
    }
  }

  /**
   * Emits event saying that this level should be deleted
   */
  onDeleteLevel() {
    this.deleteLevel.emit(this.level.id);
  }

  /**
   * Validates user input, displays error message if errors are found
   * @returns {boolean} true if user input passes the validation, false otherwise
   */
  private validateChanges(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }
    if (!this.content || this.content.replace(/\s/g, '') === '') {
      errorMessage += 'Content cannot be empty\n'
    }
    if (!this.solution || this.solution.replace(/\s/g, '') === '') {
      errorMessage += 'Solution cannot be empty\n'
    }
    if (!this.flag || this.flag.replace(/\s/g, '') === '' || this.flag.length > 50) {
      errorMessage += 'Flag cannot be empty or larger than 50 characters\n'
    }
    if (Number.isNaN(this.incorrectFlagLimit) || this.incorrectFlagLimit < 0) {
      errorMessage += 'Incorrect flag limit must be a positive number\n'
    }
    if (Number.isNaN(this.maxScore) || this.maxScore < 0 || this.maxScore > 100) {
      errorMessage += 'Maximal score must be a number in range from 0 to 100\n'
    }

    if (!this.estimatedDuration && this.estimatedDuration !== 0) {
      this.estimatedDuration = 60;
    } else if (this.estimatedDuration < 1 || this.estimatedDuration > 60) {
      errorMessage += 'Estimated duration must be a number in range from 1 to 60\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  /**
   * Sets user input values to the game level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.content = this.content;
    this.level.solution  = this.solution;
    this.level.maxScore = this.maxScore;
    this.level.flag = this.flag;
    this.level.solutionPenalized = this.solutionPenalized;
    this.level.incorrectFlagLimit = this.incorrectFlagLimit;
    this.level.estimatedDuration = this.estimatedDuration;
    this.level.hints = this.hints;
  }

  /**
   * Sets initial values from passed game level object to inputs (edit mode)
   */
  private setInitialValues() {
    if (this.level) {
      this.title = this.level.title;
      this.content = this.level.content;
      this.solution = this.level.solution;
      this.maxScore = this.level.maxScore;
      this.flag = this.level.flag;
      this.solutionPenalized = this.level.solutionPenalized;
      this.incorrectFlagLimit = this.level.incorrectFlagLimit;
      this.estimatedDuration = this.level.estimatedDuration;
      this.hints = this.level.hints;
    }
  }

}
