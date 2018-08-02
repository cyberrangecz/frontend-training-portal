import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingRun} from "../../model/training/training-run";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingRunStateEnum} from "../../enums/training-run-state.enum";

/**
 * Service abstracting the training run endpoint.
 * Can retrieve training runs based on several parameters
 */
@Injectable()
export class TrainingRunGetterService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves all training runs from the endpoint
   * @returns {Observable<TrainingRun[]>} observable of list of training runs
   */
  getTrainingRuns(): Observable<TrainingRun[]> {
    return this.http.get(environment.getTrainingRunsUri)
      .pipe(map(response =>
        this.parseTrainingRuns(response)));
  }

  /**
   * Retrieves all training runs which are still active (can be accessed and "played")
   * @returns {Observable<TrainingRun[]>} observable of list of active training runs
   */
  getActiveTrainingRuns(): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
      trainings.filter(training =>
        training.startTime.valueOf() <= Date.now() && training.endTime.valueOf() >= Date.now())))
  }

  /**
   * Retrieves training run with matching id
   * @param {number} id id of training run which should be retrieved
   * @returns {Observable<TrainingRun>} observable of training run, null if no training run with matching id si found
   */
  getTrainingRunById(id: number): Observable<TrainingRun> {
    return this.getTrainingRuns().pipe(map(trainings =>
    trainings.find(training => training.id  === id)));
  }

  /**
   * Retrieves training runs with matching players id
   * @param {number} playerId id of player (trainee) associated with training runs
   * @returns {Observable<TrainingRun[]>} Observable of list of training runs matching players id
   */
  getTrainingRunsByPlayerId(playerId: number): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
    trainings.filter(training => training.userId === playerId)));
  }

  /**
   * Retrieves training runs with matching sandbox id
   * @param {number} sandboxId id of sandbox associated with training runs
   * @returns {Observable<TrainingRun[]>} Observable of list of training runs matching sandbox id
   */
  getTrainingRunsBySandboxId(sandboxId: number): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
      trainings.filter(training => training.sandboxInstanceId === sandboxId)));
  }

  /**
   * Retrieves training runs wit matching training instance id
   * @param {number} trainingId id of training instance associated with training runs
   * @returns {Observable<TrainingRun[]>} Observable of list of training runs matching training instance id
   */
  getTrainingRunsByTrainingInstanceId(trainingId: number): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
      trainings.filter(training => training.trainingInstanceId === trainingId)));
  }

  /**
   * Parses response from server and creates training run objects
   * @param trainingJson json from http response
   * @returns {TrainingRun[]} List of objects created from json
   */
  private parseTrainingRuns(trainingJson): TrainingRun[] {
    const trainings: TrainingRun[] = [];
    trainingJson.training_runs.forEach(trainingJson => {
      const training = new TrainingRun(
        trainingJson.training_instance_id,
        trainingJson.sandbox_instance_id,
        trainingJson.user_id,
        new Date(trainingJson.start_time),
        new Date(trainingJson.end_time),
        trainingJson.current_level,
        trainingJson.event_log_reference,
        this.parseTrainingRunStateString2Enum(trainingJson.state)
      );
      training.id = trainingJson.id;
      training.currentLevel = trainingJson.current_level;
      trainings.push(training);
    });
    return trainings;
  }

  /**
   * Parses training run state from string to enum
   * @param {string} state string of training run state
   * @returns {TrainingRunStateEnum} enum of matched training run state
   */
  private parseTrainingRunStateString2Enum(state: string): TrainingRunStateEnum {
    if (state === 'new') {
      return TrainingRunStateEnum.New
    }
    if (state === 'allocated') {
      return TrainingRunStateEnum.Allocated
    }
    if (state === 'ready') {
      return TrainingRunStateEnum.Ready
    }
    if (state === 'archived') {
      return TrainingRunStateEnum.Archived
    }
  }
}

