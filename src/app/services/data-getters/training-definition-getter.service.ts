import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {Observable} from "rxjs/internal/Observable";
import {ActiveUserService} from "../active-user.service";

@Injectable()
/**
 * Service to abstract communication with training definition endpoint.
 * Can retrieve training definition based on several parameters
 */
export class TrainingDefinitionGetterService {

  constructor(
    private activeUser: ActiveUserService,
    private http: HttpClient) {
  }

  /**
   * Retrieves all training definitions
   * @returns {Observable<TrainingDefinition[]>} Observable of training definitions list
   */
  getTrainingDefs(): Observable<TrainingDefinition[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    return this.http.get(environment.trainingDefsEndpointUri, { headers: headers })
      .pipe(map(response =>
        this.parseTrainingDefs(response)));
  }

  /**
   * Retrieves training definition by its id
   * @param {number} id id of training definition
   * @returns {Observable<TrainingDefinition>} Observable of retrieved training definition, null if no training with such id is found
   */
  getTrainingDefById(id: number): Observable<TrainingDefinition> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });

/*    return this.http.get(environment.trainingDefsEndpointUri + id, { headers: headers })
      .pipe(map(response =>
        this.parseTrainingDefs(response)));*/

    return this.getTrainingDefs()
      .pipe(map(trainings =>
        trainings.find(training => training.id === id)));
  }

  /**
   * Downloads Training Definition file
   * @param id id of training definition which should be downloaded
   */
  downloadTrainingDef(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });
    // TODO: call to download Training Def
  }

  /**
   * Retrieves training definitions in released state
   * @returns {Observable<TrainingDefinition[]>} Observable of retrieved list of training definitions
   */
  getReleasedTrainingDefs(): Observable<TrainingDefinition[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });

    return this.getTrainingDefs()
      .pipe(map(trainings =>
      trainings.filter(training => training.state === TrainingDefinitionStateEnum.Released)));
  }

  /**
   * Retrieves training definition by id of associated sandbox definition
   * @param {number} sandboxId id of sandbox definition associated with training definition
   * @returns {Observable<TrainingDefinition[]>} Observable of list of training definitions matching sandbox definition id
   */
  getTrainingDefsBySandboxDefId(sandboxId: number): Observable<TrainingDefinition[]> {
    // TODO: Move to sandbox endpoint?
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': this.activeUser.getActiveUserAuthorizationHeader()
    });

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
      training.showProgress = trainingJson.show_progress;
      trainingDefs.push(training);
    });
    return trainingDefs;
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
