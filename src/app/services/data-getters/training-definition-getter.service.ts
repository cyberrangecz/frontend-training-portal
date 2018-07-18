import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstanceGetterService} from "./training-instance-getter.service";

@Injectable()
export class TrainingDefinitionGetterService {

  constructor(
    private http: HttpClient,
    private trainingInstanceGetter: TrainingInstanceGetterService) {
  }

  getTrainingDefs(): Observable<TrainingDefinition[]> {
    return this.http.get(environment.getTrainingDefsUri)
      .pipe(map(response =>
        this.parseTrainingDefs(response)));
  }

  getTrainingDefsByUserId(userId: number): Observable<TrainingDefinition[]> {
    return this.getTrainingDefs()
      .pipe(map(trainings =>
      this.filterTrainingDefsByUserId(userId, trainings)));
  }

  private filterTrainingDefsByUserId(id: number, trainingDefs: TrainingDefinition[]): TrainingDefinition[] {
    return trainingDefs.filter(training => training.authors.includes(id));
  }

  private parseTrainingDefs(trainingDefsJson) {
    const trainingDefs: TrainingDefinition[] = [];

    trainingDefsJson.training_defs.forEach(trainingJson => {
      const training = new TrainingDefinition(
        trainingJson.sandbox_definition,
        this.parseAuthorIds(trainingJson.authors),
        this.trainingDefStateString2Enum(trainingJson.state),
        trainingJson.levels);

      training.id =trainingJson.id;
      training.title = trainingJson.title;
      training.description = trainingJson.description;
      training.prerequisites = trainingJson.prerequisites;
      training.outcomes = trainingJson.outcomes;
      this.determineIfTrainingCanBeArchived(training);
      trainingDefs.push(training);
    });
    return trainingDefs;
  }

  private determineIfTrainingCanBeArchived(trainingDef: TrainingDefinition) {
   // TODO: implement more effectively. This way, all instances are requested for each training definition
    this.trainingInstanceGetter.getTrainingInstancesByTrainingDefinitionId(trainingDef.id)
      .subscribe((trainingInstances) => {
        trainingDef.canBeArchived = trainingInstances.every(trainingInstance =>
          (trainingInstance.startTime.valueOf() <= Date.now()
            && trainingInstance.endTime.valueOf() <= Date.now()))
      });
  }

  private trainingDefStateString2Enum(state: string): TrainingDefinitionStateEnum {
    if (state === 'unreleased') {
      return TrainingDefinitionStateEnum.Unreleased;
    }
    if (state === 'released') {
      return TrainingDefinitionStateEnum.Released
    }
    if (state === 'archived') {
      return TrainingDefinitionStateEnum.Archived;
    }
     // throw error
  }

  private parseAuthorIds(authors): number[] {
    const ids: number[] =[];
    authors.forEach(author => ids.push(author.id));
    return ids;
  }
}
