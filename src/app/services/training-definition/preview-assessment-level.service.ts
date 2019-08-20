import {Injectable} from "@angular/core";
import {AbstractQuestion} from "../../model/questions/abstract-question";
import {Observable, of} from "rxjs";
import {PreviewTrainingRunService} from "./preview-training-run.service";
import {ActiveTrainingRunService} from "../training-run/active-training-run.service";

@Injectable()
export class PreviewAssessmentLevelService {

  submit(trainingRunId: number, answers: AbstractQuestion[]): Observable<any> {
    return of(true);
  }
}
