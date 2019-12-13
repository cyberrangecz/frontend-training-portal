import { TrainingDefinitionStateEnum } from './../../model/enums/training-definition-state.enum';
import { TrainingDefinition } from '../../model/training/training-definition';
import { Observable } from 'rxjs';
import { RequestedPagination } from 'kypo2-table';
import { PaginatedResource } from '../../model/table/other/paginated-resource';
import {PaginatedResourceService} from './paginated-resource.service';

export abstract class TrainingDefinitionService extends PaginatedResourceService {

  abstract trainingDefinitions$: Observable<PaginatedResource<TrainingDefinition[]>>;

  abstract getAll(pagination: RequestedPagination, filter: string): Observable<PaginatedResource<TrainingDefinition[]>>;

  abstract delete(id: number): Observable<any>;

  abstract create(result: TrainingDefinition): Observable<any>;

  abstract clone(trainingDefId: number, title: string): Observable<any>;

  abstract download(trainingDefId: number): Observable<any>;

  abstract upload(file: File): Observable<any>;

  abstract changeState(newState: TrainingDefinitionStateEnum, trainingDefId: number): Observable<any>;
}
