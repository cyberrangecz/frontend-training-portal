import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AbstractLevelDTO} from '../../model/DTOs/level/abstract-level-dto';
import {HintDTO} from '../../model/DTOs/level/game/hint-dto';
import {IsCorrectFlagDTO} from '../../model/DTOs/level/game/is-correct-flag-dto';
import {KypoRequestedPagination} from 'kypo-common';
import {AccessTrainingRunDTO} from '../../model/DTOs/training-run/access-training-run-dto';
import {TrainingRunDTO} from '../../model/DTOs/training-run/training-run-dto';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {FlagCheck} from '../../model/level/flag-check';
import {Hint} from '../../model/level/hint';
import {Question} from '../../model/questions/question';
import {AccessedTrainingRun} from '../../model/table/rows/accessed-training-run';
import {KypoPaginatedResource} from 'kypo-common';
import {AccessTrainingRunInfo} from '../../model/training/access-training-run-info';
import {TrainingRun} from '../../model/training/training-run';
import {Level} from '../../model/level/level';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {TrainingRunMapper} from '../../model/mappers/training-run/training-run-mapper';
import {AccessedTrainingRunMapper} from '../../model/mappers/training-run/accessed-training-run-mapper';
import {AccessTrainingRunMapper} from '../../model/mappers/training-run/access-training-run-mapper';
import {LevelMapper} from '../../model/mappers/level/level-mapper';
import {FlagMapper} from '../../model/mappers/training-run/flag-mapper';
import {HintMapper} from '../../model/mappers/level/game/hint-mapper';
import {QuestionMapper} from '../../model/mappers/level/assessment/question-mapper';
import {PaginationMapper} from '../../model/mappers/pagination-mapper';

/**
 * Service abstracting http communication with training run endpoints.
 */
@Injectable()
export class TrainingRunApi {

  readonly trainingRunsUriExtension = 'training-runs/';

  readonly trainingRunsEndpointUri = environment.trainingRestBasePath + this.trainingRunsUriExtension;

  constructor(private http: HttpClient) {
  }

  /**
   * Sends http request to retrieve training run by id
   * @param {number} id id of training run which should be retrieved
   */
  get(id: number): Observable<TrainingRun> {
    return this.http.get<TrainingRunDTO>(this.trainingRunsEndpointUri + id)
      .pipe(map(response => TrainingRunMapper.fromDTO(response)));
  }

  /**
   * Sends http request to retrieve training run already accessed by logged in user
   * @param pagination requested pagination
   */
  getAccessed(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AccessedTrainingRun>> {
    return this.http.get<TrainingRunRestResource>(this.trainingRunsEndpointUri + 'accessible/',
      {params: PaginationParams.forJavaAPI(pagination)})
      .pipe(
        map(response => new KypoPaginatedResource<AccessedTrainingRun>(
          AccessedTrainingRunMapper.fromDTOs(response.content),
          PaginationMapper.fromJavaAPI(response.pagination)
        )));
  }

  /**
   * Sends http request to delete training run
   * @param trainingRunId id of a training run which should be deleted
   */
  delete(trainingRunId: number): Observable<any> {
    return this.http.delete(this.trainingRunsEndpointUri + trainingRunId);
  }

  /**
   * Sends http request to delete training runs in batch
   * @param trainingRunIds ids of training runs which should be deleted
   */
  deleteMultiple(trainingRunIds: number[]): Observable<any> {
    const params = new HttpParams().append('trainingRunIds', trainingRunIds.toString());
    return this.http.delete(this.trainingRunsEndpointUri, { params: params});
  }

  /**
   * Sends http request to access training run with access token.
   * @param token access token to access the training run
   */
  access(token: string): Observable<AccessTrainingRunInfo> {
    return this.http.post<AccessTrainingRunDTO>(this.trainingRunsEndpointUri + '?accessToken=' + token, {})
      .pipe(
        map(response => AccessTrainingRunMapper.fromDTO(response)),
      );
  }

  /**
   * Sends http request to resume in training run
   * @param trainingRunId id of a training run to resume
   */
  resume(trainingRunId: number): Observable<AccessTrainingRunInfo> {
    return this.http.get<AccessTrainingRunDTO>(this.trainingRunsEndpointUri + trainingRunId + '/resumption')
      .pipe(
        map(response => AccessTrainingRunMapper.fromDTO(response)),
      );
  }


  /**
   * Sends http request to move to next level
   * @param trainingRunId id of a training run
   */
  nextLevel(trainingRunId: number): Observable<Level> {
    return this.http.get<AbstractLevelDTO>(this.trainingRunsEndpointUri + trainingRunId + '/next-levels')
      .pipe(
        map(response => LevelMapper.fromDTO(response)),
      );
  }

  /**
   * Sends http request to submit the flag from game level and check its valid
   * @param trainingRunId id of training run in which the flag should be submitted
   * @param flag a flag submitted by user
   */
  isCorrectFlag(trainingRunId: number, flag: string): Observable<FlagCheck> {
    return this.http.get<IsCorrectFlagDTO>(this.trainingRunsEndpointUri + trainingRunId + '/is-correct-flag?flag=' + flag)
      .pipe(map(response => FlagMapper.fromDTO(response)));
  }

  /**
   * Sends http request to display hint and deduct points for it
   * @param trainingRunId id of training run in which, hint should be revealed
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<Hint> {
    return this.http.get<HintDTO>(this.trainingRunsEndpointUri + trainingRunId + '/hints/' + hintId)
      .pipe(map(response => HintMapper.fromDTO(response)));
  }

  /**
   * Sends http request to display solution to a level
   * @param trainingRun id of the training run in which, solution should be revealed
   */
  takeSolution(trainingRun: number): Observable<string> {
    return this.http.get(this.trainingRunsEndpointUri + trainingRun + '/solutions', {responseType: 'text' });
  }

  /**
   * Sends http request to submit user answers for questions in assessment level
   * @param trainingRun id of the training run in which, questions should be submitted
   * @param questions questions which answers should be submitted
   */
  submitAnswers(trainingRun: number, questions: Question[]): Observable<any> {
    return this.http.put(this.trainingRunsEndpointUri + trainingRun + '/assessment-evaluations',
       QuestionMapper.toAnswersDTOs(questions));
  }

  /**
   * Sends http request to finish active training run
   * @param trainingRunId id of a training run which should be finished
   */
  finish(trainingRunId: number): Observable<any> {
    return this.http.put(this.trainingRunsEndpointUri + trainingRunId, null);
  }

}

