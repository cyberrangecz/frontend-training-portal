import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActiveUserService} from "../active-user.service";
import {environment} from "../../../environments/environment";
import {TrainingInstance} from "../../model/training/training-instance";

@Injectable()
export class TrainingInstanceSetterService {

  constructor(private http: HttpClient,
              private activeUser: ActiveUserService) {
  }

  /**
   * Sends request to create new training instance in DB and returns id of the created training instance
   * @param {TrainingInstance} trainingInstance training instance which should be created
   */
  addTrainingInstance(trainingInstance: TrainingInstance) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    this.http.post(environment.trainingInstancesEndpointUri, trainingInstance,{ headers: headers });
  }

  /**
   * Sends request to update training instance in DB
   * @param trainingInstance training instance which should be updated
   */
  updateTrainingInstance(trainingInstance: TrainingInstance) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    this.http.put(environment.trainingInstancesEndpointUri, trainingInstance,{ headers: headers });
  }

  /**
   * Sends request to delete training instance from DB
   * @param trainingInstanceId id of training instance which should be deleted
   */
  removeTrainingInstance(trainingInstanceId: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    this.http.delete(environment.trainingInstancesEndpointUri + trainingInstanceId,{ headers: headers });
  }
}
