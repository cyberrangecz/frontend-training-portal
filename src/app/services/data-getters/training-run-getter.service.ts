import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingRun} from "../../model/training/training-run";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingRunStateEnum} from "../../enums/training-run-state.enum";

@Injectable()
export class TrainingRunGetterService {

  constructor(private http: HttpClient) {
  }

  getTrainingRuns(): Observable<TrainingRun[]> {
    return this.http.get(environment.getTrainingRunsUri)
      .pipe(map(response =>
        this.parseTrainingRuns(response)));
  }

  getActiveTrainingRuns(): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
      trainings.filter(training =>
        training.startTime.valueOf() <= Date.now() && training.endTime.valueOf() >= Date.now())))
  }

  getTrainingRunById(id: number): Observable<TrainingRun> {
    return this.getTrainingRuns().pipe(map(trainings =>
    trainings.find(training => training.id  === id)));
  }

  getTrainingRunsByPlayerId(playerId: number): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
    trainings.filter(training => training.userId === playerId)));
  }

  getTrainingRunsBySandboxId(sandboxId: number): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
      trainings.filter(training => training.sandboxInstanceId === sandboxId)));
  }

  getTrainingRunsByTrainingInstanceId(trainingId: number): Observable<TrainingRun[]> {
    return this.getTrainingRuns().pipe(map(trainings =>
      trainings.filter(training => training.trainingInstanceId === trainingId)));
  }

  private parseTrainingRuns(trainingsJSON): TrainingRun[] {
    const trainings: TrainingRun[] = [];
    trainingsJSON.training_runs.forEach(trainingJSON => {
      const training = new TrainingRun(
        trainingJSON.training_instance_id,
        trainingJSON.sandbox_instance_id,
        trainingJSON.user_id,
        new Date(trainingJSON.start_time),
        new Date(trainingJSON.end_time),
        trainingJSON.current_level,
        trainingJSON.event_log_reference,
        this.parseTrainingRunStateString2Enum(trainingJSON.state)
      );
      training.id = trainingJSON.id;
      trainings.push(training);
    });
    return trainings;
  }

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

