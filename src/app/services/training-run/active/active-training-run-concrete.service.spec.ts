import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ActiveTrainingRunConcreteService } from './active-training-run-concrete.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {skip} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {asyncData} from '../../../testing/helpers/async-data';
import {environment} from '../../../../environments/environment';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {Kypo2Pagination} from '../../../model/table/other/kypo2-pagination';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {TrainingInstance} from '../../../model/training/training-instance';

describe('ActiveTrainingRunConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let sandboxInstanceApiSpy: jasmine.SpyObj<SandboxInstanceApi>;

  let service: ActiveTrainingRunConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    sandboxInstanceApiSpy = jasmine.createSpyObj('SandboxInstanceApi', ['deleteByTrainingInstance']);
    trainingInstanceApiSpy = jasmine.createSpyObj('TrainingInstanceApi', ['getAssociatedTrainingRuns']);

    TestBed.configureTestingModule({
      providers: [
        ActiveTrainingRunConcreteService,
        {provide: TrainingInstanceApi, useValue: trainingInstanceApiSpy},
        {provide: SandboxInstanceApi, useValue: sandboxInstanceApiSpy },
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
        {provide: AlertService, useValue: alertServiceSpy}
      ]
    });
    service = TestBed.get(ActiveTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should error handler', done => {
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(throwError(null));
    service.getAll(1, createPagination()).subscribe(_ => fail,
      _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(1);
  });

  it('should call error handler on err', done => {
    const pagination = createPagination();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(throwError(null));
    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe(hasError => {
        expect(hasError).toBeTruthy();
        done();
      },
      _ => fail);
    service.getAll(0, pagination)
      .subscribe(_ => fail,
        _ => _);
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValue(asyncData(mockData));

    service.startPolling(new TrainingInstance());
    const subscription = service.activeTrainingRuns$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync( () => {
    const mockData = createMock();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null)); // throw error on fourth call

    service.startPolling(new TrainingInstance());
    const subscription = service.activeTrainingRuns$.subscribe();
    assertPoll(3);
    tick(5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceApiSpy.getAssociatedTrainingRuns.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData));

    service.startPolling(new TrainingInstance());
    const subscription = service.activeTrainingRuns$.subscribe();
    assertPoll(3);
    tick(environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    tick( 5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(4);
    service.getAll(0, pagination).subscribe();
    expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(5);
    assertPoll(3, 6);
    subscription.unsubscribe();
  }));

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new PaginatedResource([], new Kypo2Pagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 1) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.organizerSummaryPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(trainingInstanceApiSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
