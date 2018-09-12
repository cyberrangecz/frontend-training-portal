import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TrainingInstance} from "../../model/training/training-instance";

@Injectable()
export class TrainingInstanceSetterService {

  constructor(private http: HttpClient) {
  }

  /**
   * Sends request to create new training instance in DB and returns id of the created training instance
   * @param {TrainingInstance} trainingInstance training instance which should be created
   */
  addTrainingInstance(trainingInstance: TrainingInstance) {
    this.http.post(environment.trainingInstancesEndpointUri, trainingInstance);
  }

  /**
   * Sends request to update training instance in DB
   * @param trainingInstance training instance which should be updated
   */
  updateTrainingInstance(trainingInstance: TrainingInstance) {
    this.http.put(environment.trainingInstancesEndpointUri, trainingInstance);
  }

  /**
   * Sends request to delete training instance from DB
   * @param trainingInstanceId id of training instance which should be deleted
   */
  removeTrainingInstance(trainingInstanceId: number) {
    this.http.delete(environment.trainingInstancesEndpointUri + trainingInstanceId);
  }
}
