import {TrainingInstance} from '../../../model/training/training-instance';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {ArchivedTrainingRunConcreteService} from './archived-training-run-concrete.service';
import {throwError} from 'rxjs';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {skip} from 'rxjs/operators';
import {asyncData} from 'kypo-common';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPagination} from 'kypo-common';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../shared/alert.service';
import {MatDialog} from '@angular/material/dialog';

describe('ArchivedTrainingRunConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let trainingInstanceFacadeSpy: jasmine.SpyObj<TrainingInstanceApi>;
  let trainingRunFacadeSpy: jasmine.SpyObj<TrainingRunApi>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let alertHandlerSpy: jasmine.SpyObj<AlertService>;
  let service: ArchivedTrainingRunConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    trainingInstanceFacadeSpy = jasmine.createSpyObj('TrainingInstanceApi', ['getAssociatedTrainingRuns']);
    alertHandlerSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    trainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunFacade', ['deleteMultiple']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ArchivedTrainingRunConcreteService,
        {provide: MatDialog, useValue: dialogSpy},

        { provide: TrainingInstanceApi, useValue: trainingInstanceFacadeSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy },
        { provide: AlertService, useValue: alertHandlerSpy },
        { provide: TrainingRunApi, useValue: trainingRunFacadeSpy }
      ]
    });
    service = TestBed.inject(ArchivedTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
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
      expect(trainingInstanceFacadeSpy.getAssociatedTrainingRuns).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
