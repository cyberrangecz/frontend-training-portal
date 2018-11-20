import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingRun} from "../../model/training/training-run";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingRunDTO} from "../../model/DTOs/trainingRunDTO";
import {TrainingRunMapperService} from "../data-mappers/training-run-mapper.service";
import {TrainingRunRestResource} from '../../model/DTOs/trainingRunRestResource';
import {TraineeAccessedTrainingsTableDataModel} from "../../model/table-models/trainee-accessed-trainings-table-data-model";

/**
 * Service abstracting the training run endpoint.
 * Can retrieve training runs based on several parameters
 */
@Injectable()
export class TrainingRunGetterService {

  constructor(private http: HttpClient,
              private trainingRunMapper: TrainingRunMapperService) {
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
  getAccessedTrainingRuns(): Observable<TraineeAccessedTrainingsTableDataModel[]> {
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri + 'accessed')
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }

  getAccessedTrainingRunsWithPaginatios(page: number, size: number, sort: string, sortDir: string):
    Observable<TraineeAccessedTrainingsTableDataModel[]> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingRunRestResource>(environment.trainingRunsEndpointUri + 'accessed', {params: params})
      .pipe(map(response => this.trainingRunMapper.mapAccessedTrainingRunDTOsToTrainingRunTableObjects(response)));
  }


}

