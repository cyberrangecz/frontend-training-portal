import { Component, OnInit } from '@angular/core';
import {TrainingRun} from "../../../model/training/training-run";
import {TrainingInstance} from "../../../model/training/training-instance";
import {AbstractLevel} from "../../../model/level/abstract-level";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";
import {TrainingRunGetterService} from "../../../services/data-getters/training-run-getter.service";
import {TrainingInstanceGetterService} from "../../../services/data-getters/training-instance-getter.service";


@Component({
  selector: 'training-run',
  templateUrl: './training-run.component.html',
  styleUrls: ['./training-run.component.css']
})
export class TrainingRunComponent implements OnInit {

  trainingRun: TrainingRun;
  trainingInstance: TrainingInstance;
  levels: AbstractLevel[];

  selectedStep: number;
  withStepper: boolean;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private levelGetter: LevelGetterService,
    private trainingRunGetter: TrainingRunGetterService,
    private trainingInstanceGetter: TrainingInstanceGetterService) {
  }

  ngOnInit() {
    this.initDataFromUrl();
    this.selectedStep = 0;
    this.withStepper = true;
  }

  nextLevel() {
    this.trainingRun.currentLevel++;
    this.selectedStep += 1;
    this.router.navigate([{ outlets: { game: ['level', this.selectedStep + 1] } }], {relativeTo: this.activeRoute});
  }

  showResults() {
    this.router.navigate([{ outlets: { game: ['results'] } }], {relativeTo: this.activeRoute});
  }

  stepClick(event) {
    this.selectedStep = event.selectedIndex;
    this.trainingRun.currentLevel = this.selectedStep;
    this.router.navigate([{ outlets: { game: ['level', this.selectedStep + 1] } }], {relativeTo: this.activeRoute});
  }

  private initDataFromUrl() {
    const id = +this.activeRoute.snapshot.paramMap.get('id');
    if (id && !Number.isNaN(id)) {
      this.trainingRunGetter.getTrainingRunById(id)
        .subscribe(trainingRun => {
          this.trainingRun = trainingRun;
          this.trainingInstanceGetter.getTrainingInstanceById(trainingRun.trainingInstanceId)
            .subscribe(trainingInstance => {
              this.trainingInstance = trainingInstance;
              this.levelGetter.getLevelsByTrainingDefId(trainingInstance.id)
                .subscribe(levels => {
                  this.levels = levels;
                  this.router.navigate([{ outlets: { game: ['level', this.selectedStep + 1] } }], {relativeTo: this.activeRoute});
                })
            })
        })
    }
  }
}


