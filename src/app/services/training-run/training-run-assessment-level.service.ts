import {Injectable} from "@angular/core";
import {TrainingRunFacade} from "../facades/training-run-facade.service";
import {Observable} from "rxjs";
import {AbstractQuestion} from "../../model/questions/abstract-question";

@Injectable()
export class TrainingRunAssessmentLevelService {

  constructor(private trainingRunFacade: TrainingRunFacade) {

  }

  submit(trainingRunId: number, answers: AbstractQuestion[]): Observable<any> {
    return this.trainingRunFacade.submitAnswers(trainingRunId, answers);
  }
}
