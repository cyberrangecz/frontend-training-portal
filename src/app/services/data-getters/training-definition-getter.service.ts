import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstanceGetterService} from "./training-instance-getter.service";

@Injectable()
/**
 * Service to abstract communication with training definition endpoint.
 * Can retrieve training definition based on several parameters
 */
export class TrainingDefinitionGetterService {

  constructor(
    private http: HttpClient,
    private trainingInstanceGetter: TrainingInstanceGetterService) {
  }

  /**
   * Retrieves all training definitions
   * @returns {Observable<TrainingDefinition[]>} Observable of training definitions list
   */
  getTrainingDefs(): Observable<TrainingDefinition[]> {
    return this.http.get(environment.getTrainingDefsUri)
      .pipe(map(response =>
        this.parseTrainingDefs(response)));
  }

  /**
   * Retrieves training definition by its id
   * @param {number} id id of training definition
   * @returns {Observable<TrainingDefinition>} Observable of retrieved training definition, null if no training with such id is found
   */
  getTrainingDefById(id: number): Observable<TrainingDefinition> {
    // TODO: Use backend getById for better performance
    return this.getTrainingDefs()
      .pipe(map(trainings =>
        trainings.find(training => training.id === id)));
  }

  /**
   * Retrieves training definition by id of its author
   * @param {number} userId id of training definition author
   * @returns {Observable<TrainingDefinition[]>} Observable of list of training definitions matching authors id
   */
  getTrainingDefsByAuthorId(userId: number): Observable<TrainingDefinition[]> {
    return this.getTrainingDefs()
      .pipe(map(trainings =>
        trainings.filter(training => training.authorIds.includes(userId))));
  }

  /**
   * Retrieves training definition by id of associated sandbox definition
   * @param {number} sandboxId id of sandbox definition associated with training definition
   * @returns {Observable<TrainingDefinition[]>} Observable of list of training definitions matching sandbox definition id
   */
  getTrainingDefsBySandboxDefId(sandboxId: number): Observable<TrainingDefinition[]> {
    return this.getTrainingDefs()
      .pipe(map(trainings =>
        trainings.filter(training => training.sandboxDefinitionId === sandboxId)));
  }

  /**
   * Parses JSON received in HTTP response
   * @param trainingDefsJson JSON of training definitions
   * @returns {TrainingDefinition[]} list of training definitions created from JSON
   */
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
      trainingDefs.push(training);
    });
    return trainingDefs;
  }

  /**
   * Determines if training can be archived (no training instance associated with the definition is running or scheduled to run in a future)
   * @param {TrainingDefinition} trainingDef
   */
  determineIfTrainingCanBeArchived(trainingDef: TrainingDefinition) {
   // TODO: implement more effectively. This way, all instances are requested for each training definition
    this.trainingInstanceGetter.getTrainingInstancesByTrainingDefinitionId(trainingDef.id)
      .subscribe((trainingInstances) => {
        trainingDef.canBeArchived = trainingInstances.every(trainingInstance =>
          (trainingInstance.startTime.valueOf() <= Date.now()
            && trainingInstance.endTime.valueOf() <= Date.now()))
      });
  }

  /**
   * Converts string to state enum
   * @param {string} state string of state
   * @returns {TrainingDefinitionStateEnum} matched state enum
   */
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

  /**
   * Parse ids from authors JSON
   * @param authors JSON defining authors of training definition
   * @returns {number[]} ids of authors retrieved from JSON
   */
  private parseAuthorIds(authors): number[] {
    const ids: number[] =[];
    authors.forEach(author => ids.push(author.id));
    return ids;
  }
}
