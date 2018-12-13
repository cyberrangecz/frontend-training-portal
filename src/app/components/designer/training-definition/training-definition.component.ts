import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinition} from "../../../model/training/training-definition";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../../../model/level/abstract-level";
import {TrainingConfigurationComponent} from "./training-configuration/training-configuration.component";
import {TrainingLevelStepperComponent} from "./levels/training-level-stepper/training-level-stepper.component";
import {MatDialog} from "@angular/material";
import {UnsavedChangesDialogComponent} from "./unsaved-changes-dialog/unsaved-changes-dialog.component";
import {of} from "rxjs/internal/observable/of";


@Component({
  selector: 'designer-training-definition',
  templateUrl: './training-definition.component.html',
  styleUrls: ['./training-definition.component.css']
})
/**
 * Main component of training definition. Servers mainly as a wrapper and resolves id of a training specified in the URL.
 * Training definition with provided id is retrieved from the server and passed to child component
 */
export class TrainingDefinitionComponent implements OnInit {

  @ViewChild(TrainingConfigurationComponent) trainingConfigurationComponent;
  @ViewChild(TrainingLevelStepperComponent) trainingLevelStepperComponent;

  trainingDefinition$: Observable<TrainingDefinition>;
  levels$: Observable<AbstractLevel[]>;

  isTrainingSaved: boolean;
  isSidenavOpen: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private trainingDefinitionGetter: TrainingDefinitionGetterService) {

  }

  ngOnInit() {
    this.fetchData();
  }

  trainingSavedChange(event: boolean) {
    this.isTrainingSaved = event;
  }

  trainingDefIdChange(event: number) {
    this.trainingDefinition$ = this.fetchTrainingDefinition();
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.trainingConfigurationComponent.canDeactivate()
      && this.trainingLevelStepperComponent.getCanDeactivateLevels()
        .every(level => level.canBeDeactivated)
  }

  levelDeleted(index: number) {
    this.fetchLevelsFromTrainingDefinition();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    const messages: string[] = this.getErrorMessages();

    if (messages.length > 0) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: messages,
          saveOption: false
        },
      });
      return dialogRef.afterClosed().pipe(map(result => {
        return result && result.type === 'confirm'
      }));
    } else {
      return of(true);
    }
  }

  private getErrorMessages(): string[] {
    const result: string[] = [];
    const canDeactivateLevels = this.trainingLevelStepperComponent.getCanDeactivateLevels();
    const isLevelChangesSaved = canDeactivateLevels.every(level => level.canBeDeactivated);

    this.addMessageIfNotEmpty(result, this.getTrainingChangesMessage(this.trainingConfigurationComponent.canDeactivate()));
    this.addMessageIfNotEmpty(result, this.getLevelsChangesMessage(isLevelChangesSaved, canDeactivateLevels));
    return result;
  }

  private addMessageIfNotEmpty(messages: string[], message: string) {
    if (message) {
      messages.push(message);
    }
  }

  private getTrainingChangesMessage(isTrainingChangesSaved: boolean): string {
    return isTrainingChangesSaved ? null : 'Training definition is not saved.';
  }

  private getLevelsChangesMessage(isLevelChangesSaved: boolean, canDeactivateLevels): string {
    return isLevelChangesSaved
      ? null
      : 'Following levels are not saved: ' + canDeactivateLevels
      .filter(level => !level.canBeDeactivated)
      .map(level => level.title) + '.';
  }

  /**
   * Gets training definition and levels from url parameter and passes it to child component
   */
  private fetchData() {
    if (this.route.paramMap) {
      this.trainingDefinition$ = this.fetchTrainingDefinition();
      this.levels$ = this.fetchLevelsFromTrainingDefinition();
    }
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  private fetchTrainingDefinition(): Observable<TrainingDefinition> {
    return this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        if (params.has('id')) {
          const trainingDefId = +params.get('id');
          this.isTrainingSaved = true;
          return trainingDefId === null ? null : this.trainingDefinitionGetter.getTrainingDefinitionById(trainingDefId, true);
        }
        this.isTrainingSaved = false;
      }));
  }

  private fetchLevelsFromTrainingDefinition(): Observable<AbstractLevel[]> {
      return this.trainingDefinition$.pipe(map(trainingDef => trainingDef.levels));
  }
}
