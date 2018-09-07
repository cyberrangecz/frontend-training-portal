import {Injectable} from "@angular/core";
import {ActiveUserService} from "../active-user.service";
import {HttpHeaders} from "@angular/common/http";
import {AbstractQuestion} from "../../model/questions/abstract-question";

@Injectable()
export class TrainingRunSetterService {

  constructor(private activeUser: ActiveUserService) {

  }

  /**
   * Reverts training run
   * @param id id of training run which should be reverted
   */
  revert(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to revert training run
  }

  /**
   * Sends request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to move to next level
  }

  /**
   * Sends request to submit the flag from game level and check whether it is valid
   * @param levelId id of the active game level
   * @param flag flag submitted by user
   */
  submitFlag(levelId: number, flag: string) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to check flag
  }

  /**
   * Sends request to display hint and deduce points for it
   * @param levelId id of active level
   * @param hintId id of requested hint
   */
  takeHint(levelId: number, hintId: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to take a hint
  }

  /**
   * Sends request to display solution to a level
   * @param levelId id of the active level
   */
  takeSolution(levelId: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to take a solution
  }

  /**
   * Submits users answers for questions in assessment level
   * @param levelId id of the active level
   * @param questions questions which answers should be submitted
   */
  submitQuestions(levelId: number, questions: AbstractQuestion[]) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: Call REST API to submit questions
  }


}
