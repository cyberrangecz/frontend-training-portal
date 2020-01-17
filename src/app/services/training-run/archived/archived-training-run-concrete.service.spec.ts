import { TrainingInstance } from '../../../model/training/training-instance';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ArchivedTrainingRunConcreteService } from './archived-training-run-concrete.service';
import { throwError } from 'rxjs';
import { TrainingInstanceApi } from '../../api/training-instance-api.service';
import { TrainingRunApi } from '../../api/training-run-api.service';
import { skip } from 'rxjs/operators';
import { asyncData } from '../../../testing/helpers/async-data';
import { RequestedPagination } from 'kypo2-table';
import { PaginatedResource } from '../../../model/table/other/paginated-resource';
import { Pagination } from '../../../model/table/other/pagination';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../../shared/alert.service';

describe('ArchivedTrainingRunConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let trainingInstanceFacadeSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let trainingRunFacadeSpy: jasmine.SpyObj<TrainingRunApi>;
  let alertHandlerSpy: jasmine.SpyObj<AlertService>;
  let service: ArchivedTrainingRunConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    trainingInstanceFacadeSpy = jasmine.createSpyObj('TrainingInstanceApi', ['getAssociatedTrainingRuns']);
    alertHandlerSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    trainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunFacade', ['deleteMultiple']);

    TestBed.configureTestingModule({
      providers: [
        ArchivedTrainingRunConcreteService,
        { provide: TrainingInstanceApi, useValue: trainingInstanceFacadeSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: AlertService, useValue: alertHandlerSpy },
        { provide: TrainingRunApi, useValue: trainingRunFacadeSpy }
      ]
    });
    service = TestBed.get(ArchivedTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    trainingInstanceFacadeSpy.getAssociatedTrainingRuns.and.returnValue(throwError(null));

    service.getAll(1, createPagination()).subscribe(_ => fail,
      _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(1);
  });

  it('should emit hasError observable on err', done => {
    trainingInstanceFacadeSpy.getAssociatedTrainingRuns.and.returnValue(throwError(null));

    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe(hasError => {
        expect(hasError).toBeTruthy();
        done();
      },
        _ => fail);
    service.getAll(1, createPagination()).subscribe(
      _ => fail,
      _ => done()
    );
  });

  it('should called deleteMultiple (called once)', done => {
    const mockData = createMock();
    const ti = new TrainingInstance();
    ti.id = 1;
    trainingInstanceFacadeSpy.getAssociatedTrainingRuns.and.returnValue(asyncData(mockData));
    trainingRunFacadeSpy.deleteMultiple.and.returnValue(asyncData([1, 2, 5]));
    service.startPolling(ti); // to initialize the service
    service.deleteMultiple([1, 2, 5]).subscribe(_ => {
        expect(trainingRunFacadeSpy.deleteMultiple).toHaveBeenCalledTimes(1);
        expect(trainingRunFacadeSpy.deleteMultiple).toHaveBeenCalledWith([1, 2, 5]);
        done();
      },
      _ => fail);
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRuns.and.returnValue(asyncData(mockData));
    service.startPolling(new TrainingInstance());
    const subscription = service.archivedTrainingRuns$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null)); // throw error on fourth call
    service.startPolling(new TrainingInstance());
    const subscription = service.archivedTrainingRuns$.subscribe();
    assertPoll(3);
    tick(5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData));

    service.startPolling(new TrainingInstance());
    const subscription = service.archivedTrainingRuns$.subscribe();
    assertPoll(3);
    tick(environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    tick(5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    service.getAll(0, pagination).subscribe();
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(5);
    assertPoll(3, 6);
    subscription.unsubscribe();
  }));

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new PaginatedResource([], new Pagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 1) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.organizerSummaryPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
