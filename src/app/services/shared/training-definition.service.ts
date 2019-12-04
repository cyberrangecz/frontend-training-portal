import { TrainingDefinitionStateEnum } from './../../model/enums/training-definition-state.enum';
import { TrainingDefinition } from '../../model/training/training-definition';
import { Observable } from 'rxjs';
import { Kypo2Table, RequestedPagination } from 'kypo2-table';
import { PaginatedResource } from '../../model/table/other/paginated-resource';
import { TrainingDefinitionTableRow } from '../../model/table/row/training-definition-table-row';
import { Filter } from '../../model/utils/filter';

export abstract class TrainingDefinitionService {
  abstract trainingDefinitions$: Observable<
    Kypo2Table<TrainingDefinitionTableRow>
  >;

  /**
   * Returns all training definitions which are available
   * @param pagination consists of page size and page number. This param can be omitted in first call.
   */
  abstract getAll(
    filters: Filter[],
    pagination?: RequestedPagination
  ): Observable<PaginatedResource<TrainingDefinitionTableRow[]>>;

  /**
   * Deletes training definition by given id
   * @param id unique identifier of sandbox
   */
  abstract delete(id: number): Observable<any>;

  /**
   * Adds new training definition to existing ones
   * @param result consists of URL to Gitlab and revision
   */
  abstract add(result: TrainingDefinition): Observable<any>;

  abstract clone(trainingDefId: number, title: string): Observable<any>;

  abstract download(trainingDefId: number): Observable<any>;

  abstract upload(file: File): Observable<any>;

  abstract changeState(
    newState: TrainingDefinitionStateEnum,
    trainingDefId: number
  ): Observable<any>;
}
