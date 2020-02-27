import {TrainingDefinitionStateEnum} from '../../../model/enums/training-definition-state.enum';
import {TrainingDefinition} from '../../../model/training/training-definition';
import {Observable} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated resources and other operations to modify data.
 * Subscribe to trainingDefinitions$ to receive latest data updates.
 */
export abstract class TrainingDefinitionService extends PaginatedResourceService<TrainingDefinition> {
  /**
   *
   * @param pagination requested pagination
   * @param filter filter to be applied on training definition
   */
  abstract getAll(pagination: RequestedPagination, filter: string): Observable<PaginatedResource<TrainingDefinition>>;

  /**
   * Deletes selected training definition
   * @param trainingDefinitionId id of training definition to delete
   */
  abstract delete(trainingDefinitionId: number): Observable<any>;

  /**
   * Creates a clone of selected training definition
   * @param trainingDefinitionId id of a training definition to clone
   * @param title title of the cloned training definition
   */
  abstract clone(trainingDefinitionId: number, title: string): Observable<any>;

  /**
   * Downloads training definition description in JSON
   * @param trainingDefinitionId id of a training definition to download
   */
  abstract download(trainingDefinitionId: number): Observable<any>;

  /**
   * Creates new training definition by uploading JSON description.
   * @param file file of a training definition description
   */
  abstract upload(file: File): Observable<any>;

  /**
   * Changes state of a training definition
   * @param trainingDefinitionId id of a training definition whose state shall be changed
   * @param newState new state of a training definition
   */
  abstract changeState(trainingDefinitionId: number, newState: TrainingDefinitionStateEnum, ): Observable<any>;
}
