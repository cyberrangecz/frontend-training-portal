import {
  Component,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {AbstractLevel} from "../../../../../model/level/abstract-level";
import {LevelConfigurationComponent} from "../level-configuration/level-configuration.component";
import {ActionConfirmationDialog} from "../../../../shared/delete-dialog/action-confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {AlertService} from "../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {TrainingDefinitionFacade} from "../../../../../services/facades/training-definition-facade.service";
import {TrainingDefinition} from "../../../../../model/training/training-definition";
import {Subscription} from "rxjs";
import {LevelsDefinitionService} from "../../../../../services/designer/levels-definition.service";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'training-level-stepper',
  templateUrl: './training-level-stepper.component.html',
  styleUrls: ['./training-level-stepper.component.css']
})
/**
 * Component of training level stepper which is used to create new or edit existing levels in training definition.
 */
export class TrainingLevelStepperComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChildren(LevelConfigurationComponent) levelConfigurationComponents: QueryList<LevelConfigurationComponent>;

  @Input('isTrainingSaved') isTrainingSaved: boolean;
  @Input('trainingDefinition') trainingDefinition: TrainingDefinition;

  levels: AbstractLevel[];
  isLoading = true;
  isWaitingOnServerResponse = true;
  selectedStep: number = 0;

  private _levelUpdateSubscription: Subscription;

  constructor(public dialog: MatDialog,
              private levelService: LevelsDefinitionService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private trainingDefinitionFacade: TrainingDefinitionFacade) { }

  ngOnInit() {
    this.subscribeLevelUpdates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('trainingDefinition' in changes) {
      if (this.trainingDefinition) {
        this.resolveInitialLevels();
      }
    }
  }

  ngOnDestroy(): void {
    if (this._levelUpdateSubscription) {
      this._levelUpdateSubscription.unsubscribe();
    }
  }


  /**
   * Determines if all levels in level stepper were saved and user can navigate to different component
   * @returns {{ canDeactivate: boolean, order: number }[]} object with list of levels which can be deactivated and its order (index)
   */
  getCanDeactivateLevels(): { canBeDeactivated: boolean, order: number }[] {
    const levels = [];
    this.levelConfigurationComponents.forEach((levelComponent , i) => {
      const levelCanDeactivate = levelComponent.canDeactivate();
      levels.push(
        {
          canBeDeactivated: levelCanDeactivate,
          order: i + 1
        });
      }
    );
    return levels
  }

  /**
   * Creates new info level with default values
   */
  addInfoLevel() {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.createInfoLevel(this.trainingDefinition.id)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id))
      )
      .subscribe(
        level => {
          this.onLevelAdded(level);
        },
        (err: HttpErrorResponse) => this.errorHandler.displayInAlert(err, 'Creating info level')
      );
  }

  /**
   * Creates new game level with default values
   */
  addGameLevel() {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.createGameLevel(this.trainingDefinition.id)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id))
      )
      .subscribe(
        level => {
          this.onLevelAdded(level);
        },
        (err: HttpErrorResponse) =>  this.errorHandler.displayInAlert(err, 'Creating game level')
      );
  }

  /**
   * Creates new assessment level with default values
   */
  addAssessmentLevel() {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.createAssessmentLevel(this.trainingDefinition.id)
      .pipe(
        switchMap(basicLevelInfo => this.trainingDefinitionFacade.getLevelById(basicLevelInfo.id))
      )
      .subscribe(
        level => {
          this.onLevelAdded(level);
        },
        (err: HttpErrorResponse) => this.errorHandler.displayInAlert(err, 'Creating assessment level')
      );
  }

  /**
   * Swaps order of currently selected level with level next to him (to the left)
   */
  swapLeft() {
    this.isLoading = true;
    const from = this.levels[this.selectedStep];
    const to = this.levels[this.selectedStep - 1];
    this.trainingDefinitionFacade.swap(this.trainingDefinition.id, from.id, to.id)
      .subscribe(swappedLevelsInfo => {
          this.isLoading = false;
          this.swapLevelsLocally(this.selectedStep, this.selectedStep - 1);
          this.selectedStep--;
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Level "' + from.title + '" was successfully swapped to the left');
        },
        err => {
          this.isLoading = false;
          this.errorHandler.displayInAlert(err, 'Swapping level "' + from.title + '" to the left');
        }
      );
  }

  /**
   * Swaps order of currently selected level with level next to him (to the right)
   */
  swapRight() {
    this.isLoading = true;
    const from = this.levels[this.selectedStep];
    const to = this.levels[this.selectedStep + 1];
    this.trainingDefinitionFacade.swap(this.trainingDefinition.id, from.id, to.id)
      .subscribe(swappedLevelsInfo => {
          this.isLoading = false;
          this.swapLevelsLocally(this.selectedStep, this.selectedStep + 1);
          this.selectedStep++;
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Level "' + from.title + '" was successfully swapped to the right');
        },
        err => {
          this.isLoading = false;
          this.errorHandler.displayInAlert(err, 'Swapping level "' + from.title + '" to the right');
        }
        );
  }

  /**
   * Deletes level on given index
   * @param {number} toDeleteId index of level which should be deleted
   */
  onDeleteLevel(toDeleteId: number) {
    const levelToDelete = this.findLevel(this.levels, toDeleteId);
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data:
        {
          type: 'level',
          action: 'delete',
          title: levelToDelete.title
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendDeleteLevelRequest(levelToDelete)
      }
    });
  }

  private sendDeleteLevelRequest(levelToDelete: AbstractLevel) {
    this.isWaitingOnServerResponse = true;
    this.trainingDefinitionFacade.deleteLevel(this.trainingDefinition.id, levelToDelete.id)
      .subscribe(updatedLevels => {
          this.alertService.emitAlert(AlertTypeEnum.Success ,'Level "' + levelToDelete.title + '" was successfully deleted');
          this.levels = this.levels.filter(level => level.id != levelToDelete.id);
          this.navigateToPreviousLevel();
          this.isWaitingOnServerResponse = false;

        },
        err => {
          this.errorHandler.displayInAlert(err, 'Deleting level "' + levelToDelete.title + '"');
          this.isWaitingOnServerResponse = false;

        });
  }


  selectionChanged(event) {
    this.changeSelectedStep(event.selectedIndex);
  }

  private changeSelectedStep(index: number) {
    this.selectedStep = index;
  }

  private resolveInitialLevels() {
    if (this.trainingDefinition.levels && this.trainingDefinition.levels.length > 0) {
      this.levels = this.trainingDefinition.levels;
    } else {
      this.levels = [];
    }
    this.isLoading = false;
    this.isWaitingOnServerResponse = false;
  }

  private findLevel(levels: AbstractLevel[], levelId): AbstractLevel {
    return levels.find(level => level.id === levelId);
  }

  private onLevelAdded(level: AbstractLevel) {
    this.isWaitingOnServerResponse = false;
    this.levels.push(level);
    this.navigateToLastLevel()
  }

  private navigateToLastLevel() {
    setTimeout(() => this.changeSelectedStep(this.levels.length - 1), 1);
  }

  private navigateToPreviousLevel() {
    const previousStep = Math.max(0, this.selectedStep - 1);
    setTimeout( () => this.changeSelectedStep(previousStep), 1);
  }
  private subscribeLevelUpdates() {
    this._levelUpdateSubscription = this.levelService.onLevelUpdated
      .subscribe(level => this.updateLevelTitle(level))
  }

  private updateLevelTitle(level: AbstractLevel) {
    const levelToUpdate = this.findLevel(this.levels, level.id);
    if (levelToUpdate) {
      levelToUpdate.title = level.title;
    }
  }

  private swapLevelsLocally(from: number, to: number) {
    const tempLevel = this.levels[from];
    this.levels[from] = this.levels[to];
    this.levels[to]= tempLevel;
  }
}


