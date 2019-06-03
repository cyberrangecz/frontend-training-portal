import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrainingInstance} from "../../../model/training/training-instance";
import {TrainingInstanceFacade} from "../../../services/facades/training-instance-facade.service";

@Component({
  selector: 'app-access-token-detail',
  templateUrl: './access-token-detail.component.html',
  styleUrls: ['./access-token-detail.component.css']
})
export class AccessTokenDetailComponent implements OnInit {

  isLoading = true;
  trainingInstance: TrainingInstance;

  constructor(private activeRoute: ActivatedRoute,
              private trainingInstanceFacade: TrainingInstanceFacade) { }

  ngOnInit() {
    let instanceId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (instanceId) {
      this.trainingInstanceFacade.getTrainingInstanceById(instanceId)
        .subscribe(trainingInstance => {
          this.trainingInstance = trainingInstance;
          this.isLoading = false;
        });
    }
  }
}
