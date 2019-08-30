import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import {Observable, of, zip} from 'rxjs';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {map, switchMap } from 'rxjs/operators';
import {ADD_LEVEL_PATH} from '../../training-definition-overview/paths';
import {UnsavedChangesDialogComponent} from '../../../shared/unsaved-changes-dialog/unsaved-changes-dialog.component';
import {TrainingLevelStepperComponent} from '../training-level-stepper/training-level-stepper.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'kypo2-level-overview',
  templateUrl: './level-overview.component.html',
  styleUrls: ['./level-overview.component.css']
})
export class LevelOverviewComponent implements OnInit {

  @ViewChild(TrainingLevelStepperComponent, { static: true }) levelStepperComponent;

  trainingDefinition$: Observable<TrainingDefinition>;
  activeStep$: Observable<number>;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
  }

  ngOnInit() {
    this.trainingDefinition$ = this.resolveTrainingDefinition();
    this.activeStep$ = this.resolveActiveStep();
  }

  onActiveLevelChange(levelId: number) {
    if (levelId === -1) {
      setTimeout(() => this.router.navigate(['..', ADD_LEVEL_PATH], { relativeTo: this.activeRoute }), 10);
    }
    this.router.navigate(['..', levelId], { relativeTo: this.activeRoute });
  }

  /**
   * Shows dialog asking the user if he really wants to leave the page after refresh or navigating to another page
   */
  @HostListener('window:beforeunload')
  canRefreshOrLeave(): boolean {
    return this.levelStepperComponent.canDeactivate();
  }

  /**
   * Determines if all changes in sub components are saved and user can navigate to different component
   * @returns {Observable<boolean>} true if saved all his changes or agreed with leaving without saving them, false otherwise
   */
  canDeactivate(): Observable<boolean> {
    const canDeactivateLevelsInfo = this.levelStepperComponent.getCanDeactivateLevels().filter(levelCanDeactivateInfo => !levelCanDeactivateInfo.canBeDeactivated);
    if (canDeactivateLevelsInfo.length > 0) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent, {
        data: {
          payload: ['Following levels are not saved: ' + canDeactivateLevelsInfo.map(levelInfo => levelInfo.order)],
          saveOption: false
        },
      });
      return dialogRef.afterClosed()
        .pipe(
          map(result => result && result.type === 'confirm')
        );
    }
    return of(true);
  }


  private resolveTrainingDefinition(): Observable<TrainingDefinition> {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    return this.trainingDefinitionFacade.getTrainingDefinitionById(id, true);
  }

  private resolveActiveStep(): Observable<number> {
    return this.resolveActiveLevelId()
      .pipe(
        switchMap(levelId => this.trainingDefinition$.pipe(map(td => td.levels.findIndex(level => level.id === levelId))))
      );
  }

  private resolveActiveLevelId(): Observable<number> {
    const firstLevelId = this.trainingDefinition$.pipe(map(td => td.levels.length > 0 ? td.levels[0].id : -1));
    const routeId = this.activeRoute.paramMap
      .pipe(
        map(params => {
          const levelId = Number(params.get('levelId'));
          if (levelId && !Number.isNaN(levelId)) {
            return levelId;
          }
          return -1;
        })
      );
    return zip(firstLevelId, routeId)
      .pipe(
        map(result => {
          if (result[0] === -1 && result[1] === -1) {
            return -1;
          } else if (result[1] === -1) {
            return result[0];
          } else {
            return result[1];
          }
        })
      );
  }
}
