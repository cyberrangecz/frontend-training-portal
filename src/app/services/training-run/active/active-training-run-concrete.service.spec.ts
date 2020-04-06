import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ActiveTrainingRunConcreteService} from './active-training-run-concrete.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingInstanceApi} from 'kypo-training-api';
import {skip} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {asyncData} from 'kypo-common';
import {environment} from '../../../../environments/environment';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPagination} from 'kypo-common';
import {SandboxInstanceApi} from 'kypo-sandbox-api';
import {AlertService} from '../../shared/alert.service';
import {TrainingInstance} from 'kypo-training-model';
import {MatDialog} from '@angular/material/dialog';
import {PoolRequestApi} from 'kypo-sandbox-api';

describe('ActiveTrainingRunConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let trainingInstanceApiSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let sandboxInstanceApiSpy: jasmine.SpyObj<SandboxInstanceApi>;
  let requestApiSpy: jasmine.SpyObj<PoolRequestApi>;

  let service: ActiveTrainingRunConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    sandboxInstanceApiSpy = jasmine.createSpyObj('SandboxInstanceApi', ['getSandbox']);
    requestApiSpy = jasmine.createSpyObj('PoolRequestApi', ['createCleanupRequest']);
    trainingInstanceApiSpy = jasmine.createSpyObj('TrainingInstanceApi', ['getAssociatedTrainingRuns']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      providers: [
        ActiveTrainingRunConcreteService,
        {provide: MatDialog, useValue: dialogSpy},
        {provide: TrainingInstanceApi, useValue: trainingInstanceApiSpy},
        {provide: PoolRequestApi, useValue: requestApiSpy},
        {provide: SandboxInstanceApi, useValue: sandboxInstanceApiSpy },
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
        {provide: AlertService, useValue: alertServiceSpy}
      ]
    });
    service = TestBed.inject(ActiveTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit hasError on err', done => {
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
    const subscription = service.resource$.subscribe();
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
    const subscription = service.resource$.subscribe();
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
    const subscription = service.resource$.subscribe();
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
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new KypoPaginatedResource([], new KypoPagination(1, 0, 5, 5, 1));
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
