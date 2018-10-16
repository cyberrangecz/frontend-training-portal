import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TrainingInstance} from "../../model/training/training-instance";
import {Observable} from "rxjs";
import {TrainingInstanceMapperService} from "../data-mappers/training-instance-mapper.service";
import {TrainingInstanceDTO} from "../../model/DTOs/trainingInstanceDTO";
import {map} from "rxjs/operators";

@Injectable()
export class TrainingInstanceSetterService {

  constructor(private http: HttpClient,
              private trainingInstanceMapper: TrainingInstanceMapperService) {
  }

  /**
   * Sends request to create new training instance in DB and returns id of the created training instance
   * @param {TrainingInstance} trainingInstance training instance which should be created
   */
  createTrainingInstance(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.post<TrainingInstanceDTO>(environment.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance))
      .pipe(map(trainingInstanceDTO => this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO)));
  }

  /**
   * Sends request to update training instance in DB
   * @param trainingInstance training instance which should be updated
   */
  updateTrainingInstance(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.put<TrainingInstanceDTO>(environment.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance))
      .pipe(map(trainingInstanceDTO => this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO)));
  }

  /**
   * Sends request to delete training instance from DB
   * @param trainingInstanceId id of training instance which should be deleted
   */
  removeTrainingInstance(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(environment.trainingInstancesEndpointUri + trainingInstanceId);
  }

  /**
   * Sends request to allocate all sandboxes for selected training instance
   * @param trainingInstanceId
   */
  allocateSandboxesForTrainingInstance(trainingInstanceId: number ): Observable<any> {
    return this.http.post<any>(environment.trainingInstancesEndpointUri + trainingInstanceId + '/sandbox-instances', null);
  }
}
