import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InfoLevel} from "../../../../../../model/level/info-level";
import {AlertTypeEnum} from "../../../../../../model/enums/alert-type.enum";
import {AlertService} from "../../../../../../services/shared/alert.service";
import {ErrorHandlerService} from "../../../../../../services/shared/error-handler.service";
import {TrainingDefinitionFacade} from "../../../../../../services/facades/training-definition-facade.service";
import {LevelsDefinitionService} from "../../../../../../services/designer/levels-definition.service";
import {BaseComponent} from "../../../../../base.component";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'info-level-configuration',
  templateUrl: './info-level-configuration.component.html',
  styleUrls: ['./info-level-configuration.component.css']
})
/**
 * Component for configuration of new or existing info level
 */
export class InfoLevelConfigurationComponent extends BaseComponent implements OnInit, OnChanges {

  @Input('level') level: InfoLevel;
  @Input('trainingDefinitionId') trainingDefinitionId: number;

  @Output('deleteLevel') deleteLevel: EventEmitter<number> = new EventEmitter();

  title: string;
  content: string;

  isLoading = false;
  dirty = false;

  constructor(private trainingDefinitionFacade: TrainingDefinitionFacade,
              private levelService: LevelsDefinitionService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
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
    return !this.dirty;
  }

  /**
   * Validates and saves input values to the level object and calls REST API of server to save changes
   */
  saveChanges() {
    if (this.validateChanges()) {
      this.isLoading = true;
      this.setInputValuesToLevel();
      this.trainingDefinitionFacade.updateInfoLevel(this.trainingDefinitionId, this.level)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(resp => {
          this.isLoading = false;
          this.dirty = false;
          this.levelService.emitLevelUpdated(this.level);
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Info level was successfully saved');
        },
  err => {
          this.isLoading =false;
          this.errorHandler.displayInAlert(err, 'Updating info level "' + this.level.title + '"');
            });
    }
  }

  /**
   * Reacts on change in inputs. Sets dirty to true
   */
  contentChanged() {
    this.dirty = true;
  }

  /**
   * Validates user input and displays error messages if errors are found
   * @returns {boolean} true if input passes the validation, false otherwise
   */
  private validateChanges(): boolean {
    let errorMessage: string = '';

    if (!this.title || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Title cannot be empty\n'
    }

    if (!this.content || this.title.replace(/\s/g, '') === '') {
      errorMessage += 'Content cannot be empty\n'
    }

    if (errorMessage !== '') {
      this.alertService.emitAlert(AlertTypeEnum.Error, errorMessage);
      return false;
    }
    return true;
  }

  /**
   * Sets input values to the info level object
   */
  private setInputValuesToLevel() {
    this.level.title = this.title;
    this.level.content = this.content;
  }

  /**
   * Sets initial values to inputs from info level object (edit mode)
   */
  private setInitialValues() {
    if (this.level) {
      this.title = this.level.title;
      this.content = this.level.content;
    }
  }
}
