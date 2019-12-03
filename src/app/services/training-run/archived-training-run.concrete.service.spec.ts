import { TrainingInstance } from './../../model/training/training-instance';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { ArchivedTrainingRunConcreteService } from './archived-training-run.concrete.service';
import { throwError } from 'rxjs';
import { TrainingInstanceFacade } from '../facades/training-instance-facade.service';
import { TrainingRunFacade } from '../facades/training-run-facade.service';
import { skip } from 'rxjs/operators';
import { asyncData } from '../../testing/helpers/async-data';
import { ActiveTrainingInstanceService } from '../training-instance/active-training-instance.service';
import { RequestedPagination } from 'kypo2-table';
import { PaginatedResource } from '../../model/table-adapters/paginated-resource';
import { Kypo2Pagination } from '../../model/table-adapters/kypo2-pagination';
import { environment } from '../../../environments/environment';
import { AlertService } from '../shared/alert.service';

describe('ArchivedTrainingRunConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let trainingInstanceFacadeSpy: jasmine.SpyObj<TrainingInstanceFacade>;
  let trainingRunFacadeSpy: jasmine.SpyObj<TrainingRunFacade>;
  let activeTrainingInstanceServiceSpy: jasmine.SpyObj<ActiveTrainingInstanceService>;
  let alertHandlerSpy: jasmine.SpyObj<AlertService>;
  let service: ArchivedTrainingRunConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    trainingInstanceFacadeSpy = jasmine.createSpyObj('TrainingInstanceFacade', ['getAssociatedTrainingRunsPaginated']);
    alertHandlerSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    trainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunFacade', ['deleteMultiple']);
    activeTrainingInstanceServiceSpy = jasmine.createSpyObj('ActiveTrainingInstanceService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ArchivedTrainingRunConcreteService,
        { provide: ActiveTrainingInstanceService, useValue: activeTrainingInstanceServiceSpy },
        { provide: TrainingInstanceFacade, useValue: trainingInstanceFacadeSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: AlertService, useValue: alertHandlerSpy },
        { provide: TrainingRunFacade, useValue: trainingRunFacadeSpy }
      ]
    });
    service = TestBed.get(ArchivedTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(throwError(null));

    service.getAll(1).subscribe(_ => fail,
      _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(1);
  });

  it('should emit hasError observable on err', done => {
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(throwError(null));

    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe(hasError => {
        expect(hasError).toBeTruthy();
        done();
      },
        _ => fail);
    service.getAll(1).subscribe(
      _ => fail,
      _ => done()
    );
  });

  it('should called deleteMultiple (called once)', done => {

    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(asyncData(mockData));
    service.trainingInstance = new TrainingInstance();
    service.trainingInstance.id = 0;
    trainingRunFacadeSpy.deleteMultiple.and.returnValue(asyncData([1, 2, 5]));

    service.deleteMultiple([1, 2, 5]).subscribe(_ => done(),
      _ => fail);

    expect(trainingRunFacadeSpy.deleteMultiple).toHaveBeenCalledTimes(1);
    expect(trainingRunFacadeSpy.deleteMultiple).toHaveBeenCalledWith([1, 2, 5]);
  });

  it('should emit next value on update (archivedTrainingRuns)', done => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(asyncData(mockData));

    service.archivedTrainingRuns$.pipe(skip(1))
      .subscribe(emitted => {
        expect(emitted).toBe(mockData);
        done();
      },
        fail);
    service.getAll(0, pagination)
      .subscribe(_ => _,
        fail);
  });

  it('should emit next value on update (totalLength)', done => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(asyncData(mockData));

    const subscription = service.archivedTrainingRuns$.pipe(skip(1))
      .subscribe(_ => _,
        fail);
    service.totalLength$.pipe(skip(1))
      .subscribe(emitted => {
        expect(emitted).toBe(5);
        subscription.unsubscribe();
        done();
      },
        fail);
    service.getAll(0, pagination)
      .subscribe(_ => _,
        fail);
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(asyncData(mockData));

    const subscription = service.archivedTrainingRuns$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValues(asyncData(mockData), asyncData(mockData), throwError(null)); // throw error on third call

    const subscription = service.archivedTrainingRuns$.subscribe();
    assertPoll(3);
    tick(5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(3);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      throwError(null),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData));

    const subscription = service.archivedTrainingRuns$.subscribe();
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(0);
    assertPoll(3);
    tick(environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(3);
    tick(5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(3);
    service.getAll(0, pagination).subscribe();
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(4);
    assertPoll(3, 4);
    subscription.unsubscribe();
  }));

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new PaginatedResource([], new Kypo2Pagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 0) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.organizerSummaryPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
