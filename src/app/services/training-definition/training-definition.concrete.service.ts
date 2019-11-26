import { Filter } from './../../model/utils/filter';
import { TrainingDefinitionStateEnum } from './../../model/enums/training-definition-state.enum';
import { Observable, Subject } from 'rxjs';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { TrainingDefinitionFacade } from '../facades/training-definition-facade.service';
import { TrainingDefinitionService } from '../shared/training-definition.service';
import { TrainingDefinitionTableRow } from '../../model/table-adapters/training-definition-table-row';
import { PaginatedResource } from '../../model/table-adapters/paginated-resource';
import { RequestedPagination } from '../../model/DTOs/other/requested-pagination';
import { tap } from 'rxjs/operators';
import { Kypo2Table } from 'kypo2-table';
import { TrainingDefinitionTableCreator } from '../../model/table-adapters/training-definition-table-creator';
import { Injectable } from '@angular/core';
import { TrainingDefinition } from '../../model/training/training-definition';

@Injectable()
export class TrainingDefinitionConcreteService extends TrainingDefinitionService {
  constructor(
    private trainingDefinitionFacade: TrainingDefinitionFacade,
    private errorHandler: ErrorHandlerService
  ) {
    super();
  }

  private trainingDefinitionsSubject: Subject<
    Kypo2Table<TrainingDefinitionTableRow>
  > = new Subject();
  trainingDefinitions$: Observable<
    Kypo2Table<TrainingDefinitionTableRow>
  > = this.trainingDefinitionsSubject.asObservable();

  getAll(
    filters: Filter[] = [],
    pagination?: RequestedPagination
  ): Observable<PaginatedResource<TrainingDefinitionTableRow[]>> {
    return this.trainingDefinitionFacade
      .getAll(pagination, filters)
      .pipe(
        tap(traininges =>
          this.trainingDefinitionsSubject.next(
            TrainingDefinitionTableCreator.create(traininges)
          )
        )
      );
  }

  add(result: TrainingDefinition): Observable<any> {
    return this.trainingDefinitionFacade
      .create(result)
      .pipe(
        tap({
          error: err =>
            this.errorHandler.display(err, 'Uploading training definition')
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.trainingDefinitionFacade
      .delete(id)
      .pipe(
        tap({
          error: err =>
            this.errorHandler.display(err, 'Removing training definition')
        })
      );
  }

  clone(trainingDefId: number, title: string): Observable<any> {
    return this.trainingDefinitionFacade
      .clone(trainingDefId, title)
      .pipe(
        tap({
          error: err =>
            this.errorHandler.display(err, 'Cloning training definition')
        })
      );
  }

  download(trainingDefId: number): Observable<any> {
    return this.trainingDefinitionFacade
      .download(trainingDefId)
      .pipe(
        tap({
          error: err =>
            this.errorHandler.display(err, 'Downloading training definition')
        })
      );
  }

  upload(file: File): Observable<any> {
    return this.trainingDefinitionFacade
      .upload(file)
      .pipe(
        tap({
          error: err =>
            this.errorHandler.display(err, 'Uploading training definition')
        })
      );
  }

  changeState(
    newState: TrainingDefinitionStateEnum,
    trainingDefId: number
  ): Observable<any> {
    return this.trainingDefinitionFacade
      .changeState(newState, trainingDefId)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Changing state') })
      );
  }
}
