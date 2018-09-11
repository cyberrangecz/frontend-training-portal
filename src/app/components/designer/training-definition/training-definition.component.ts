import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinition} from "../../../model/training/training-definition";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {Observable} from "rxjs/internal/Observable";
import {AbstractLevel} from "../../../model/level/abstract-level";
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";
import {TrainingConfigurationComponent} from "./training-configuration/training-configuration.component";
import {TrainingLevelStepperComponent} from "./training-level-stepper/training-level-stepper.component";
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
  trainingDefId: number;

  isTrainingSaved: boolean;
  isSidenavOpen: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private levelGetter: LevelGetterService) {

  }

  ngOnInit() {
    this.getTrainingDefFromUrl();
    this.getLevelsByTrainingDefFromUrl();
  }

  trainingSavedChange(event: boolean) {
    this.isTrainingSaved = event;
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

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    const isTrainingChangesSaved =  this.trainingConfigurationComponent.canDeactivate();
    const canDeactivateLevels = this.trainingLevelStepperComponent.getCanDeactivateLevels();
    const isLevelChangesSaved = canDeactivateLevels.every(level => level.canBeDeactivated);
    const messages: string[] = [];

    if (!isTrainingChangesSaved) {
      messages.push('Training definition is not saved.')
    }
    if (!isLevelChangesSaved) {
      messages.push('Following levels are not saved: ' + canDeactivateLevels.filter(level => !level.canBeDeactivated).map(level => level.order) + '.');
    }

    if (messages.length > 0) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: messages
      });

      return dialogRef.afterClosed().pipe(map(result => {
        return result && result.type === 'confirm'
      }));
    } else {
      return of(true);
    }
  }

  /**
   * Gets training definition from url parameter and passes it to child component
   */
  private getTrainingDefFromUrl() {
    this.trainingDefinition$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        if (params.get('id')) {
          this.trainingDefId = +params.get('id');
          this.isTrainingSaved = true;
          return this.trainingDefId === null ? null : this.trainingDefinitionGetter.getTrainingDefById(this.trainingDefId);
        }
        this.isTrainingSaved = false;
      }));
  }

  /**
   * Gets levels assigned to the training definition specified in url parameter and passes it to child component
   */
  private getLevelsByTrainingDefFromUrl() {
    this.levels$ = this.route.paramMap
      .pipe(switchMap((params: ParamMap) => {
        const id = +params.get('id');
        return id === null ? null : this.levelGetter.getLevelsByTrainingDefId(id);
      }));
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
