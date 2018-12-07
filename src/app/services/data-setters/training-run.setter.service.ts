import {Injectable} from "@angular/core";
import {AbstractQuestion} from "../../model/questions/abstract-question";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AbstractLevel} from "../../model/level/abstract-level";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {map} from "rxjs/operators";
import {TrainingRunMapperService} from "../data-mappers/training-run-mapper.service";
import {LevelMapperService} from "../data-mappers/level-mapper.service";
import {AccessTrainingRunDTO} from "../../model/DTOs/accessTrainingRunDTO";
import {AccessTrainingRun} from "../../model/training/access-training-run";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {InfoLevel} from "../../model/level/info-level";
import {GameLevel} from "../../model/level/game-level";

@Injectable()
export class TrainingRunSetterService {
  
  constructor(private http: HttpClient,
              private trainingRunMapper: TrainingRunMapperService,
              private levelMapper: LevelMapperService) {

  }

  /**
   * Tries to access training run with password. Returns training run if the password is correct
   * @param password password to access the training run
   */
  accessTrainingRun(password: string): Observable<AccessTrainingRun> {
    return this.http.post<AccessTrainingRunDTO>(environment.trainingRunsEndpointUri, { password: password })
      .pipe(map(response => this.trainingRunMapper.mapAccessTrainingRunDTOToAccessTrainingRun(response)));
  }

  resume(trainingRunId: number): Observable<AccessTrainingRun> {
    return this.http.get<AccessTrainingRunDTO>(environment.trainingDefsEndpointUri + trainingRunId + '/resumption')
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
  isCorrectFlag(trainingRunId: number, flag: string): Observable<boolean> {
    return this.http.get<boolean>(environment.trainingRunsEndpointUri + trainingRunId + '/is-correct-flag?flag=' + flag);
  }

  /**
   * Sends request to display hint and deduce points for it
   * @param trainingRunId id of training run in which, hint should be revealed (level is decided based on the current level property)
   * @param hintId id of requested hint
   */
  takeHint(trainingRunId: number, hintId: number): Observable<string> {
    return this.http.get<string>(environment.trainingRunsEndpointUri + trainingRunId + '/hints/' + hintId)
  }

  /**
   * Sends request to display solution to a level
   * @param trainingRun id of the training run in which, solution should be revealed (level is decided based on the current level property)
   */
  takeSolution(trainingRun: number): Observable<string> {
    return this.http.get<string>(environment.trainingRunsEndpointUri + trainingRun + '/solutions');
  }

  /**
   * Submits users answers for questions in assessment level
   * @param trainingRun id of the training run in which, questions should be submitted (level is decided based on the current level property)
   * @param questions questions which answers should be submitted
   */
  submitQuestions(trainingRun: number, questions: AbstractQuestion[]) {
    // TODO: Call REST API to submit questions
  }


}
