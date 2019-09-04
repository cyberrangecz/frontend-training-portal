import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {TrainingRun} from '../../model/training/training-run';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {TrainingRunDTO} from '../../model/DTOs/training-run/training-run-dto';
import {TrainingRunMapper} from '../mappers/training-run-mapper.service';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {AccessedTrainingRunsTableRow} from '../../model/table-adapters/accessed-training-runs-table-row';
import {PaginatedTable} from '../../model/table-adapters/paginated-table';
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {HintDTO} from '../../model/DTOs/level/game/hint-dto';
import {IsCorrectFlagDTO} from '../../model/DTOs/level/game/is-correct-flag-dto';
import {FlagCheck} from '../../model/level/flag-check';
import {InfoLevel} from '../../model/level/info-level';
import {AssessmentLevel} from '../../model/level/assessment-level';
import {AbstractLevelDTO} from '../../model/DTOs/level/abstract-level-dto';
import {GameLevel} from '../../model/level/game-level';
import {Hint} from '../../model/level/hint';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {AccessTrainingRunDTO} from '../../model/DTOs/training-run/access-training-run-dto';
import {LevelMapper} from '../mappers/level-mapper.service';
import {Kypo2AuthService} from 'kypo2-auth';
import {TablePagination} from '../../model/DTOs/other/table-pagination';

/**
 * Service abstracting the training run endpoint.
 */
@Injectable()
export class TrainingRunFacade {

  readonly trainingRunsUriExtension = 'training-runs/';

  readonly trainingRunsEndpointUri = environment.trainingRestBasePath + this.trainingRunsUriExtension;

  constructor(private http: HttpClient,
              private levelMapper: LevelMapper,
              private trainingRunMapper: TrainingRunMapper) {
  }

  /**
   * Retrieves all training runs from the endpoint
   * @returns {Observable<TrainingRun[]>} observable of list of training runs
   */
  getAll(): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  getPaginated(pagination: TablePagination): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri,
      { params: PaginationParams.createTrainingsPaginationParams(pagination) })
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));

  }

  /**
   * Retrieves training run with matching id
   * @param {number} id id of training run which should be retrieved
   * @returns {Observable<TrainingRun>} observable of training run
   */
  getById(id: number): Observable<TrainingRun> {
    return this.http.get<TrainingRunDTO>(this.trainingRunsEndpointUri + id)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOToTrainingRun(response)));
  }

  /**
   * Retrieves training runs by matching id of associated training instance
   * @param {number} id id of training instance associated with training runs which should be retrieved
   * @returns {Observable<TrainingRun[]>} observable of training runs
   */
  getByTrainingInstance(id: number): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + id)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }



  /**
   * Retrieves all training runs which are still active (can be accessed and "played")
   * @returns {Observable<AccessedTrainingRunsTableRow[]>} observable of list of active training runs to be displayed in table
   */
  getAccessed(): Observable<PaginatedTable<AccessedTrainingRunsTableRow[]>> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + 'accessible/')
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  getAccessedPaginated(pagination: TablePagination):
    Observable<PaginatedTable<AccessedTrainingRunsTableRow[]>> {
    let params;
    if (pagination.sort === 'title') {
      params = this.createPaginationParamsForTRTitle(pagination);
    } else {
      params = PaginationParams.createTrainingsPaginationParams(pagination);
    }
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + 'accessible/', {params: params})
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  delete(trainingRunId: number) {
    return this.http.delete(this.trainingRunsEndpointUri + trainingRunId);
  }

  deleteMultiple(trainingRunIds: number[]) {
    const params = new HttpParams().append('trainingRunIds', trainingRunIds.toString());
    return this.http.delete(this.trainingRunsEndpointUri, { params: params});
  }

  /**
   * Tries to access training run with accessToken. Returns training run if the accessToken is correct
   * @param token accessToken to access the training run
   */
  access(token: string): Observable<AccessTrainingRunInfo> {
    return this.http.post<AccessTrainingRunDTO>(this.trainingRunsEndpointUri + '?accessToken=' + token, {})
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
    return this.http.get<AbstractLevelDTO>(this.trainingRunsEndpointUri + trainingRunId + '/next-levels')
      .pipe(map(response => this.levelMapper.mapLevelDTOToLevel(response)));
  }

  /**
   * Sends request to submit the flag from game level and check whether it is valid
   * @param trainingRunId id of training run in which, flag should be submitted (level is decided based on the current level property)
   * @param flag flag submitted by user
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck> {
    return this.http.get<IsCorrectFlagDTO>(this.trainingRunsEndpointUri + trainingRunId + '/is-correct-flag?flag=' + flag)
      .pipe(map(response => this.trainingRunMapper.mapIsCorrectFlagDTOToFlagCheck(response)));
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
    return this.http.get(this.trainingRunsEndpointUri + trainingRun + '/solutions', {responseType: 'text' });
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

  finish(trainingRunId: number): Observable<any> {
    return this.http.put(this.trainingRunsEndpointUri + trainingRunId, null);
  }

  private createPaginationParamsForTRTitle(pagination: TablePagination): HttpParams {
    return new HttpParams()
      .set('page', pagination.page.toString())
      .set('size', pagination.size.toString())
      .set('sortByTitle', pagination.sortDir);
  }
}

