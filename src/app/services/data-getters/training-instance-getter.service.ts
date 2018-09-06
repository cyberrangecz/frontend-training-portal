import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstance} from "../../model/training/training-instance";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
/**
 * Service to abstract communication with training instance endpoint.
 * Can retrieve training instances based on various parameters
 */
export class TrainingInstanceGetterService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves all training instances
   * @returns {Observable<TrainingInstance[]>} Observable of training instances list
   */
  getTrainingInstances(): Observable<TrainingInstance[]> {
    return this.http.get(environment.trainingInstancesEndpointUri)
      .pipe(map(response =>
        this.parseTrainingInstances(response)));
  }

  /**
   * Retrieves training instance by  id
   * @param {number} id of the training distance
   * @returns {Observable<TrainingInstance>} Observable of training instance, null if no such training instance is found
   */
  getTrainingInstanceById(id: number): Observable<TrainingInstance> {
    return this.getTrainingInstances()
      .pipe(map(trainingInstances =>
        trainingInstances.find(trainingInstance => trainingInstance.id === id)
      ));
  }

  /**
   * Retrieves training instances by its definition id
   * @param {number} trainingDefId Id of training definition associated with training instance
   * @returns {Observable<TrainingInstance[]>} Observable of training instances list
   */
  getTrainingInstancesByTrainingDefinitionId(trainingDefId: number): Observable<TrainingInstance[]> {
    return this.getTrainingInstances()
      .pipe(map(trainingInstances =>
        trainingInstances.filter(trainingInstance =>
          trainingInstance.trainingDefinitionId === trainingDefId)));
  }

  /**
   * Retrieves training instances by organizer id
   * @param {number} organizerId Id of one of the organizer of the training
   * @returns {Observable<TrainingInstance[]>} Observable of training instances list
   */
  getTrainingInstancesByOrganizersId(organizerId: number): Observable<TrainingInstance[]> {
    return this.getTrainingInstances()
      .pipe(map(trainingInstances =>
        trainingInstances.filter(trainingInstance =>
          trainingInstance.organizersIds.includes(organizerId))
      ));
  }

  /**
   * Retrieves training instance by keyword
   * @param {string} keyword keyword associated with training instance
   * @returns {Observable<TrainingInstance>} Observable of training instance, null if no instance with provided keyword is found
   */
  getTrainingInstanceByKeyword(keyword: string): Observable<TrainingInstance> {
    return this.getTrainingInstances()
      .pipe(map(trainingInstances =>
      trainingInstances.find(trainingInstance =>
      trainingInstance.keyword === keyword)))
  }

  /**
   * Parses JSON from HTTP request
   * @param instancesJson received JSON
   * @returns {TrainingInstance[]} List of training instances created based on provided JSON
   */
  private parseTrainingInstances(instancesJson): TrainingInstance[] {
    const trainingInstances: TrainingInstance[] = [];
    instancesJson.training_instances.forEach(instanceJson => {
      const trainingInstance = new TrainingInstance(
        instanceJson.training_definition_id,
        new Date(instanceJson.start_time),
        new Date(instanceJson.end_time),
        instanceJson.pool_size,
        this.parseOrganizersIds(instanceJson.organizers),
        instanceJson.keyword);
      trainingInstance.id = instanceJson.id;
      trainingInstance.title = instanceJson.title;

      trainingInstances.push(trainingInstance);
    });
    return trainingInstances;
  }

  /**
   * Parses JSON of sandbox instances associated with training instance
   * @param sandboxesJson JSON of sandbox instances
   * @returns {number[]} List of ids of sandbox instances retrieved from provided JSON
   */
  private parseSandboxInstancesIds(sandboxesJson): number[] {
    const ids: number[] = [];
    sandboxesJson.forEach(sandbox => ids.push(sandbox.id));
    return ids;
  }

  /**
   * Parses JSON of organizers associated with training instance
   * @param organizersJson JSON of organizers
   * @returns {number[]} List of ids of organizers retrieved from provided JSON
   */
  private parseOrganizersIds(organizersJson): number[] {
    const ids: number[] = [];
    organizersJson.forEach(organizer => ids.push(organizer.id));
    return ids;
  }
}
