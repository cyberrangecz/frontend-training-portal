import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user/user";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state-enum";
import {Observable} from "rxjs/internal/Observable";

@Injectable()
export class TrainingDefinitionLoaderService {

  constructor(private http: HttpClient) {
  }

  getTrainingDefsByUser(user: User): Observable<TrainingDefinition[]> {
    return this.http.get(environment.getTrainingDefsUri).pipe(map(response =>
       this.parseTrainingDefs(response))
    )
      .pipe(map(trainings =>
      this.filterTrainingDefsByUserId(user.id, trainings)));
  }

  private filterTrainingDefsByUserId(id: number, trainingDefs: TrainingDefinition[]): TrainingDefinition[] {
    return trainingDefs.filter(training => training.authors.includes(id));
  }

  private parseTrainingDefs(trainingDefsJson) {
    const trainingDefs: TrainingDefinition[] = [];

    trainingDefsJson.training_defs.forEach(trainingJson => {
      const training = new TrainingDefinition(
        trainingJson.id,
        trainingJson.sandbox_definition,
        this.getAuthorIds(trainingJson.authors),
        this.trainingDefStateString2Enum(trainingJson.state),
        trainingJson.levels);

      training.title = trainingJson.title;
      training.description = trainingJson.description;
      training.prerequisites = trainingJson.prerequisites;
      training.outcomes = trainingJson.outcomes;

      trainingDefs.push(training);
    });
    return trainingDefs;
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
     /// throw error
  }

  private getAuthorIds(authors): number[] {
    const ids: number[] =[];
    authors.forEach(author => ids.push(author.id));
    return ids;
  }
}
