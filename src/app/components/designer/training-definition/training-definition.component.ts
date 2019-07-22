import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinition} from "../../../model/training/training-definition";
import {map, switchMap} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TrainingDefinitionFacade} from "../../../services/facades/training-definition-facade.service";
import {Observable} from "rxjs/internal/Observable";
import {TrainingConfigurationComponent} from "./training-configuration/training-configuration.component";
import {TrainingLevelStepperComponent} from "./levels/training-level-stepper/training-level-stepper.component";
import { MatDialog } from "@angular/material/dialog";
import {UnsavedChangesDialogComponent} from "./unsaved-changes-dialog/unsaved-changes-dialog.component";
import {of} from "rxjs/internal/observable/of";
import {BaseComponent} from "../../base.component";


@Component({
  selector: 'designer-training-definition',
  templateUrl: './training-definition.component.html',
  styleUrls: ['./training-definition.component.css']
})
/**
 * Main component of training definition. Servers mainly as a wrapper and resolves id of a training specified in the URL.
 * Training definition with provided id is retrieved from the server and passed to child component
 */
export class TrainingDefinitionComponent extends BaseComponent implements OnInit {

  @ViewChild(TrainingConfigurationComponent, { static: true }) trainingConfigurationComponent;
  @ViewChild(TrainingLevelStepperComponent, { static: true }) trainingLevelStepperComponent;

  trainingDefinition$: Observable<TrainingDefinition>;

  isTrainingSaved: boolean;
  isSidenavOpen: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
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
    const canDeactivateLevelComponents = this.trainingLevelStepperComponent.getCanDeactivateLevels();
    const isLevelChangesSaved = canDeactivateLevelComponents.every(level => level.canBeDeactivated);
    const trainingDefMessage = this.getTrainingChangesMessage(this.trainingConfigurationComponent.canDeactivate());
    const levelsMessage =this.getLevelsChangesMessage(isLevelChangesSaved, canDeactivateLevelComponents);
    if (trainingDefMessage) {
      result.push(trainingDefMessage);
    }
    if (levelsMessage) {
      result.push(levelsMessage)
    }
    return result;
  }

  private getTrainingChangesMessage(isTrainingChangesSaved: boolean): string {
    return isTrainingChangesSaved ? null : 'Training definition is not saved.';
  }

  private getLevelsChangesMessage(isLevelChangesSaved: boolean, canDeactivateLevelComponents): string {
    return isLevelChangesSaved
      ? null
      : 'Following levels are not saved:' + canDeactivateLevelComponents
      .filter(levelComponent => !levelComponent.canBeDeactivated)
      .map(levelComponent => ' ' + levelComponent.order) + '.';
  }

  /**
   * Gets training definition and levels from url parameter and passes it to child component
   */
  private fetchData() {
    if (this.route.paramMap) {
      this.trainingDefinition$ = this.fetchTrainingDefinition();
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
          return trainingDefId === null ? of(null) : this.trainingDefinitionFacade.getTrainingDefinitionById(trainingDefId, true);
        }
        this.isTrainingSaved = false;
        return of(null);
      }));
  }


}
