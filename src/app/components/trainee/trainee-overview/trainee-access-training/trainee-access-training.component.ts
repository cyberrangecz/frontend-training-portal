import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'trainee-access-training',
  templateUrl: './trainee-access-training.component.html',
  styleUrls: ['./trainee-access-training.component.css']
})
/**
 * Components where user can access active training run by inserting correct password
 */
export class TraineeAccessTrainingComponent implements OnInit {

  password: string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService,
    private trainingInstanceGetter: TrainingInstanceGetterService) { }

  ngOnInit() {
  }

  /**
   * Finds active training run with matching password and allocates resources for the trainee.
   * If resources are allocated, navigates user to the first level of the training
   */
  access() {
    // TODO: Find active run with matching password, find available sandbox and redirect to level 1
    if (this.password && this.password.replace(/\s/g, '') !== '') {
      this.trainingInstanceGetter.getTrainingInstanceByKeyword(this.password)
        .subscribe(trainingInstance => {
          if (trainingInstance) {
            // TODO: pass training instance to REST, get training run and navigate to it
            const trainingRunId = 1;
            const firstLevel = 1;
            this.router.navigate(['training', trainingRunId, 'level', firstLevel], {relativeTo: this.activeRoute});
          } else {
            this.alertService.emitAlert(AlertTypeEnum.Error, 'Wrong password', environment.defaultAlertDuration);
          }
        })
    } else {
      this.alertService.emitAlert(AlertTypeEnum.Error, 'Password cannot be empty', environment.defaultAlertDuration);
    }
  }

}
