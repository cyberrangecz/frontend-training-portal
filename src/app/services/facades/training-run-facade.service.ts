import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingRun} from "../../model/training/training-run";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingRunDTO} from "../../model/DTOs/trainingRunDTO";
import {TrainingRunMapper} from "../mappers/training-run-mapper.service";
import {TrainingRunRestResource} from '../../model/DTOs/trainingRunRestResource';
import {TraineeAccessedTrainingsTableDataModel} from "../../model/table-models/trainee-accessed-trainings-table-data-model";
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {AbstractQuestion} from "../../model/questions/abstract-question";
import {HintDTO} from "../../model/DTOs/hintDTO";
import {IsCorrectFlagDTO} from "../../model/DTOs/isCorrectFlagDTO";
import {FlagCheck} from "../../model/level/flag-check";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {GameLevel} from "../../model/level/game-level";
import {Hint} from "../../model/level/hint";
import {AccessTrainingRun} from "../../model/training/access-training-run";
import {AccessTrainingRunDTO} from "../../model/DTOs/accessTrainingRunDTO";
import {LevelMapper} from "../mappers/level-mapper.service";

/**
 * Service abstracting the training run endpoint.
 * Can retrieve training runs based on several parameters
 */
@Injectable()
export class TrainingRunFacade {

  constructor(private http: HttpClient,
              private levelMapper: LevelMapper,
              private trainingRunMapper: TrainingRunMapper) {
  }

  /**
   * Retrieves all training runs from the endpoint
   * @returns {Observable<TrainingRun[]>} observable of list of training runs
   */
  getTrainingRuns(): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  /**
   * Retrieves training run with matching id
   * @param {number} id id of training run which should be retrieved
   * @returns {Observable<TrainingRun>} observable of training run
   */
  getTrainingRunById(id: number): Observable<TrainingRun> {
    return this.http.get<TrainingRunDTO>(environment.trainingRunsEndpointUri + id)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOToTrainingRun(response)));
  }

  /**
   * Retrieves training runs by matching id of associated training instance
   * @param {number} id id of training instance associated with training runs which should be retrieved
   * @returns {Observable<TrainingRun[]>} observable of training runs
   */
  getTrainingRunsByTrainingInstanceId(id: number): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri + id)
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
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri, { params: params })
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));

  }

  /**
   * Retrieves all training runs which are still active (can be accessed and "played")
   * @returns {Observable<TraineeAccessedTrainingsTableDataModel[]>} observable of list of active training runs to be displayed in table
   */
  getAccessedTrainingRuns(): Observable<TableDataWithPaginationWrapper<TraineeAccessedTrainingsTableDataModel[]>> {
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri + 'accessible/')
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  getAccessedTrainingRunsWithPagination(page: number, size: number, sort: string, sortDir: string):
    Observable<TableDataWithPaginationWrapper<TraineeAccessedTrainingsTableDataModel[]>> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri + 'accessible/', {params: params})
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  /**
   * Tries to access training run with accessToken. Returns training run if the accessToken is correct
   * @param password accessToken to access the training run
   */
  accessTrainingRun(password: string): Observable<AccessTrainingRun> {
    return this.http.post<AccessTrainingRunDTO>(environment.trainingRunsEndpointUri + "?accessToken=" + password, {})
      .pipe(map(response => this.trainingRunMapper.mapAccessTrainingRunDTOToAccessTrainingRun(response)));
  }

  resume(trainingRunId: number): Observable<AccessTrainingRun> {
    return this.http.get<AccessTrainingRunDTO>(environment.trainingRunsEndpointUri + trainingRunId + '/resumption')
      .pipe(map(response => this.trainingRunMapper.mapAccessTrainingRunDTOToAccessTrainingRun(response)));
  }

  /**
   * Sends request to revert training run
   * @param id id of training run which should be reverted
   */
  revert(id: number): Observable<Object> {
    // TODO: Change observable type later
    return this.http.get(environment.trainingRunsEndpointUri + id + '/revert');
  }

  /**
   * Sends request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number): Observable<GameLevel | AssessmentLevel | InfoLevel> {
    return this.http.get<AbstractLevelDTO>(environment.trainingRunsEndpointUri + trainingRunId + '/next-levels')
      .pipe(map(response => this.levelMapper.mapLevelDTOToLevel(response)));
  }

  /**
   * Sends request to submit the flag from game level and check whether it is valid
   * @param trainingRunId id of training run in which, flag should be submitted (level is decided based on the current level property)
   * @param flag flag submitted by user
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck> {
    return this.http.get<IsCorrectFlagDTO>(environment.trainingRunsEndpointUri + trainingRunId + '/is-correct-flag?flag=' + flag)
      .pipe(map(response => this.trainingRunMapper.mapIsCorrectFlagDTOToObject(response)));
  }

  /**
   * Sends request to display hint and deduce points for it
   * @param trainingRunId id of training run in which, hint should be revealed (level is decided based on the current level property)
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.http.get<HintDTO>(environment.trainingRunsEndpointUri + trainingRunId + '/hints/' + hintId)
      .pipe(map(response => this.levelMapper.mapHintDTOToHint(response)));
  }

  /**
   * Sends request to display solution to a level
   * @param trainingRun id of the training run in which, solution should be revealed (level is decided based on the current level property)
   */
  takeSolution(trainingRun: number): Observable<string> {
    return this.http.get(environment.trainingRunsEndpointUri + trainingRun + '/solutions',
      { responseType: "text" });
  }

  /**
   * Submits users answers for questions in assessment level
   * @param trainingRun id of the training run in which, questions should be submitted (level is decided based on the current level property)
   * @param questions questions which answers should be submitted
   */
  submitQuestions(trainingRun: number, questions: AbstractQuestion[]) {
    return this.http.put(environment.trainingRunsEndpointUri + trainingRun + '/assessment-evaluations',
      { responses: this.trainingRunMapper.mapQuestionsToUserAnswerJSON(questions)});
  }

}

