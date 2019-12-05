import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ActiveTrainingRunConcreteService } from './active-training-run-concrete.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {ActiveTrainingInstanceService} from '../training-instance/active-training-instance.service';
import {skip} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {asyncData} from '../../testing/helpers/async-data';
import {environment} from '../../../environments/environment';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {Kypo2Pagination} from '../../model/table/other/kypo2-pagination';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {AlertService} from '../shared/alert.service';
import {TrainingInstance} from '../../model/training/training-instance';

describe('ActiveTrainingRunConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  let trainingInstanceFacadeSpy: jasmine.SpyObj<TrainingInstanceFacade>;
  let sandboxInstanceFacadeSpy: jasmine.SpyObj<SandboxInstanceFacade>;

  let activeTrainingInstanceServiceSpy: jasmine.SpyObj<ActiveTrainingInstanceService>;
  let service: ActiveTrainingRunConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    sandboxInstanceFacadeSpy = jasmine.createSpyObj('SandboxInstanceFacade', ['deleteByTrainingInstance']);
    trainingInstanceFacadeSpy = jasmine.createSpyObj('TrainingInstanceFacade', ['getAssociatedTrainingRunsPaginated']);
    activeTrainingInstanceServiceSpy = jasmine.createSpyObj('ActiveTrainingInstanceService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ActiveTrainingRunConcreteService,
        {provide: ActiveTrainingInstanceService, useValue: activeTrainingInstanceServiceSpy},
        {provide: TrainingInstanceFacade, useValue: trainingInstanceFacadeSpy},
        {provide: SandboxInstanceFacade, useValue: sandboxInstanceFacadeSpy },
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
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(throwError(null));
    service.getAll(1).subscribe(_ => fail,
      _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(1);
  });

  it('should call error handler on err', done => {
    const pagination = createPagination();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(throwError(null));
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
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValue(asyncData(mockData));

    service.startPolling(new TrainingInstance());
    const subscription = service.activeTrainingRuns$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync( () => {
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData),
      throwError(null)); // throw error on fourth call

    service.startPolling(new TrainingInstance());
    const subscription = service.activeTrainingRuns$.subscribe();
    assertPoll(3);
    tick(5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated.and.returnValues(
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
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(4);
    tick( 5 * environment.organizerSummaryPollingPeriod);
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(4);
    service.getAll(0, pagination).subscribe();
    expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(5);
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
      expect(trainingInstanceFacadeSpy.getAssociatedTrainingRunsPaginated).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
