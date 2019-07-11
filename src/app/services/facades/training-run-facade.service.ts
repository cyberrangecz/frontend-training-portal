import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingRun} from "../../model/training/training-run";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingRunDTO} from "../../model/DTOs/training-run/training-run-dto";
import {TrainingRunMapper} from "../mappers/training-run-mapper.service";
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {AccessedTrainingRunsTableAdapter} from "../../model/table-adapters/accessed-training-runs-table-adapter";
import {PaginatedTable} from "../../model/table-adapters/paginated-table";
import {AbstractQuestion} from "../../model/questions/abstract-question";
import {HintDTO} from "../../model/DTOs/level/game/hint-dto";
import {IsCorrectFlagDTO} from "../../model/DTOs/level/game/is-correct-flag-dto";
import {FlagCheck} from "../../model/level/flag-check";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AbstractLevelDTO} from "../../model/DTOs/level/abstract-level-dto";
import {GameLevel} from "../../model/level/game-level";
import {Hint} from "../../model/level/hint";
import {AccessTrainingRunInfo} from "../../model/training/access-training-run-info";
import {AccessTrainingRunDTO} from "../../model/DTOs/training-run/access-training-run-dto";
import {LevelMapper} from "../mappers/level-mapper.service";
import {ActiveUserService} from "../shared/active-user.service";

/**
 * Service abstracting the training run endpoint.
 * Can retrieve training runs based on several parameters
 */
@Injectable()
export class TrainingRunFacade {

  readonly trainingRunsUriExtension = 'training-runs/';

  readonly trainingRunsEndpointUri = environment.trainingRestBasePath + this.trainingRunsUriExtension;

  constructor(private http: HttpClient,
              private activeUserService: ActiveUserService,
              private levelMapper: LevelMapper,
              private trainingRunMapper: TrainingRunMapper) {
  }

  /**
   * Retrieves all training runs from the endpoint
   * @returns {Observable<TrainingRun[]>} observable of list of training runs
   */
  getTrainingRuns(): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  /**
   * Retrieves training run with matching id
   * @param {number} id id of training run which should be retrieved
   * @returns {Observable<TrainingRun>} observable of training run
   */
  getTrainingRunById(id: number): Observable<TrainingRun> {
    return this.http.get<TrainingRunDTO>(this.trainingRunsEndpointUri + id)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOToTrainingRun(response)));
  }

  /**
   * Retrieves training runs by matching id of associated training instance
   * @param {number} id id of training instance associated with training runs which should be retrieved
   * @returns {Observable<TrainingRun[]>} observable of training runs
   */
  getTrainingRunsByTrainingInstanceId(id: number): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + id)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  /**
   * Retrieves all training run on current page of pagination component
   * @param page current page
   * @param size current size of the page
   * @param sort by which parameter should the result be sorted
   * @param sortDir sort direction (asc, desc)
   */
  getTrainingRunsWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<TrainingRun[]> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri, { params: params })
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));

  }

  /**
   * Retrieves all training runs which are still active (can be accessed and "played")
   * @returns {Observable<AccessedTrainingRunsTableAdapter[]>} observable of list of active training runs to be displayed in table
   */
  getAccessedTrainingRuns(): Observable<PaginatedTable<AccessedTrainingRunsTableAdapter[]>> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + 'accessible/')
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  getAccessedTrainingRunsWithPagination(page: number, size: number, sort: string, sortDir: string):
    Observable<PaginatedTable<AccessedTrainingRunsTableAdapter[]>> {
    let params;
    if (sort === 'title') {
      params = this.createPaginationParamsForTRTitle(page, size, sortDir);
    } else {
      params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    }
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + 'accessible/', {params: params})
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  deleteTrainingRun(trainingRunId: number) {
    return this.http.delete(this.trainingRunsEndpointUri + trainingRunId);
  }

  deleteTrainingRuns(trainingRunIds: number[]) {
    const params = new HttpParams().append('trainingRunIds', trainingRunIds.toString());
    return this.http.delete(this.trainingRunsEndpointUri, { params: params});
  }

  /**
   * Tries to access training run with accessToken. Returns training run if the accessToken is correct
   * @param password accessToken to access the training run
   */
  accessTrainingRun(password: string): Observable<AccessTrainingRunInfo> {
    return this.http.post<AccessTrainingRunDTO>(this.trainingRunsEndpointUri + "?accessToken=" + password, {})
      .pipe(
        map(response => this.trainingRunMapper.mapAccessTrainingRunDTOToAccessTrainingRun(response)),
      );
  }

  resume(trainingRunId: number): Observable<AccessTrainingRunInfo> {
    return this.http.get<AccessTrainingRunDTO>(this.trainingRunsEndpointUri + trainingRunId + '/resumption')
      .pipe(
        map(response => this.trainingRunMapper.mapAccessTrainingRunDTOToAccessTrainingRun(response)),
      );
  }


  /**
   * Sends request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number): Observable<GameLevel | AssessmentLevel | InfoLevel> {
    const  headers = new  HttpHeaders().set("Authorization", this.activeUserService.getActiveUserAuthorizationHeader());
    return this.http.get<AbstractLevelDTO>(this.trainingRunsEndpointUri + trainingRunId + '/next-levels', { headers: headers})
      .pipe(map(response => this.levelMapper.mapLevelDTOToLevel(response)));
  }

  /**
   * Sends request to submit the flag from game level and check whether it is valid
   * @param trainingRunId id of training run in which, flag should be submitted (level is decided based on the current level property)
   * @param flag flag submitted by user
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck> {
    return this.http.get<IsCorrectFlagDTO>(this.trainingRunsEndpointUri + trainingRunId + '/is-correct-flag?flag=' + flag)
      .pipe(map(response => this.trainingRunMapper.mapIsCorrectFlagDTOToObject(response)));
  }

  /**
   * Sends request to display hint and deduce points for it
   * @param trainingRunId id of training run in which, hint should be revealed (level is decided based on the current level property)
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.http.get<HintDTO>(this.trainingRunsEndpointUri + trainingRunId + '/hints/' + hintId)
      .pipe(map(response => this.levelMapper.mapHintDTOToHint(response)));
  }

  /**
   * Sends request to display solution to a level
   * @param trainingRun id of the training run in which, solution should be revealed (level is decided based on the current level property)
   */
  takeSolution(trainingRun: number): Observable<string> {
    return this.http.get(this.trainingRunsEndpointUri + trainingRun + '/solutions', {responseType: "text" });
  }

  /**
   * Submits users answers for questions in assessment level
   * @param trainingRun id of the training run in which, questions should be submitted (level is decided based on the current level property)
   * @param questions questions which answers should be submitted
   */
  submitAnswers(trainingRun: number, questions: AbstractQuestion[]): Observable<any> {
    return this.http.put(this.trainingRunsEndpointUri + trainingRun + '/assessment-evaluations',
       this.trainingRunMapper.mapQuestionsToUserAnswerJSON(questions));
  }

  finishTrainingRun(trainingRunId: number): Observable<any> {
    return this.http.put(this.trainingRunsEndpointUri + trainingRunId, null);
  }

  private createPaginationParamsForTRTitle(page: number, size: number, sortDir: string): HttpParams {
    return new HttpParams()
      .set("page", page.toString())
      .set("size", size.toString())
      .set("sortByTitle", sortDir);
  }
}

