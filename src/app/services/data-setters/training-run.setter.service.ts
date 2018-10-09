import {Injectable} from "@angular/core";
import {AbstractQuestion} from "../../model/questions/abstract-question";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class TrainingRunSetterService {

  constructor(private http: HttpClient) {

  }

  /**
   * Sends request to revert training run
   * @param id id of training run which should be reverted
   */
  revert(id: number) {
    // TODO: Call REST API to revert training run
  }

  /**
   * Sends request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number): Observable<Object> {
    // TODO: Change observable type later
    return this.http.get(environment.trainingRunsEndpointUri + trainingRunId + '/get-next-level');
  }

  /**
   * Sends request to submit the flag from game level and check whether it is valid
   * @param trainingRunId id of training run in which, flag should be submitted (level is decided based on the current level property)
   * @param flag flag submitted by user
   */
  submitFlag(trainingRunId: number, flag: string): Observable<boolean> {
    // TODO: Add query params accordingly to REST API docs
    const params = { flag: flag };
    return this.http.get<boolean>(environment.trainingRunsEndpointUri + trainingRunId + '/is-correct-flag', { params: params });
  }

  /**
   * Sends request to display hint and deduce points for it
   * @param trainingRunId id of training run in which, hint should be revealed (level is decided based on the current level property)
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Object> {
    // TODO: Specify type of observable returned from the method
    return this.http.get(environment.trainingRunsEndpointUri + trainingRunId + '/get-hint/' + hintId)
  }

  /**
   * Sends request to display solution to a level
   * @param trainingRun id of the training run in which, solution should be revealed (level is decided based on the current level property)
   */
  takeSolution(trainingRun: number): Observable<Object> {
    // TODO: Specify type of observable returned from the method
    return this.http.get(environment.trainingRunsEndpointUri + trainingRun + '/get-solution');
  }

  /**
   * Submits users answers for questions in assessment level
   * @param trainingRun id of the training run in which, questions should be submitted (level is decided based on the current level property)
   * @param questions questions which answers should be submitted
   */
  submitQuestions(trainingRun: number, questions: AbstractQuestion[]) {
    // TODO: Call REST API to submit questions
  }


}
