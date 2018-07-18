import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstance} from "../../model/training/training-instance";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class TrainingInstanceGetterService {

  constructor(private http: HttpClient) {
  }

  getTrainingInstances(): Observable<TrainingInstance[]> {
    return this.http.get(environment.getTrainingInstancesUri)
      .pipe(map(response =>
        this.parseTrainingInstances(response)));
  }

  getTrainingInstancesByTrainingDefinitionId(trainingDefId: number): Observable<TrainingInstance[]> {
    return this.getTrainingInstances()
      .pipe(map(trainingInstances =>
        trainingInstances.filter(trainingInstance =>
          trainingInstance.trainingDefinitionId === trainingDefId)));
  }


  private parseTrainingInstances(instancesJson): TrainingInstance[] {
    const trainingInstances: TrainingInstance[] = [];
    instancesJson.training_instances.forEach(instanceJson => {
      const trainingInstance = new TrainingInstance(
        instanceJson.training_definition_id,
        instanceJson.start_time,
        instanceJson.end_time,
        instanceJson.pool_size,
        this.parseSandboxInstancesIds(instanceJson.sandbox_instances),
        this.parseOrganizersIds(instanceJson.organizers),
        instanceJson.keyword);
      trainingInstance.id = instanceJson.id;
      trainingInstance.title = instanceJson.title;

      trainingInstances.push(trainingInstance);
    });
    return trainingInstances;
  }

  private parseSandboxInstancesIds(sandboxesJson): number[] {
    const ids: number[] = [];
    sandboxesJson.forEach(sandbox => ids.push(sandbox.id));
    return ids;
  }

  private parseOrganizersIds(organizersJson): number[] {
    const ids: number[] = [];
    organizersJson.forEach(organizer => ids.push(organizer.id));
    return ids;
  }
}
