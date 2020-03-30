import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PoolAllocationRequestsConcreteService} from './pool-allocation-requests-concrete.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {KypoRequestedPagination} from 'kypo-common';
import {asyncData} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPagination} from 'kypo-common';
import {skip} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {throwError} from 'rxjs';
import {AllocationRequest} from 'kypo-sandbox-model';
import {AlertService} from '../../../shared/alert.service';
import {PoolRequestApi} from 'kypo-sandbox-api';

describe('PoolAllocationRequestsPollingService', () => {
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let alertSpy: jasmine.SpyObj<AlertService>;
  let apiSpy: jasmine.SpyObj<PoolRequestApi>;
  let service: PoolAllocationRequestsConcreteService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    alertSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    apiSpy = jasmine.createSpyObj('PoolRequestApi', ['getAllocationRequests', 'cancelAllocationRequest']);

    TestBed.configureTestingModule({
    providers: [
      PoolAllocationRequestsConcreteService,
      {provide: PoolRequestApi, useValue: apiSpy},
      {provide: AlertService, useValue: alertSpy},
      {provide: ErrorHandlerService, useValue: errorHandlerSpy}
    ]
  });
    service = TestBed.inject(PoolAllocationRequestsConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from facade (called once)', done => {
    const pagination = createPagination();
    apiSpy.getAllocationRequests.and.returnValue(asyncData(null));

    service.getAll(0, pagination).subscribe(_ => done(),
      fail);
    expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(1);
  });

  it('should emit next value on update (requests)', done => {
    const pagination = createPagination();
    const mockData = createMock();
    apiSpy.getAllocationRequests.and.returnValue(asyncData(mockData));

    service.resource$.pipe(skip(1))
      .subscribe(emitted => {
        expect(emitted).toBe(mockData);
        done();
        },
        fail);
    service.getAll(0, pagination)
      .subscribe(_ => _,
        fail);
  });


  it('should call error handler on err', done => {
    const pagination = createPagination();
    apiSpy.getAllocationRequests.and.returnValue(throwError(null));

    service.getAll(0, pagination)
      .subscribe(_ => fail,
        _ => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should emit hasError observable on err', done => {
    const pagination = createPagination();
    apiSpy.getAllocationRequests.and.returnValue(throwError(null));
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

  it('should call facade on cancel', done => {
    const mockData = createMock();
    const request = new AllocationRequest();
    request.id = 0;
    apiSpy.getAllocationRequests.and.returnValue(asyncData(mockData));
    apiSpy.cancelAllocationRequest.and.returnValue(asyncData(null));

    service.cancel( request)
      .subscribe(_ => {
        expect(apiSpy.cancelAllocationRequest).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should update the data on cancel', done => {
    const mockData = createMock();
    const request = new AllocationRequest();
    request.id = 0;
    apiSpy.getAllocationRequests.and.returnValue(asyncData(mockData));
    apiSpy.cancelAllocationRequest.and.returnValue(asyncData(null));

    service.cancel(request)
      .subscribe(_ => {
        expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    apiSpy.getAllocationRequests.and.returnValue(asyncData(mockData));

    const subscription = service.resource$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const mockData = createMock();
    apiSpy.getAllocationRequests.and.returnValues(asyncData(mockData), asyncData(mockData), throwError(null)); // throw error on third call

    const subscription = service.resource$.subscribe();
    assertPoll(3);
    tick(5 * environment.apiPollingPeriod);
    expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(3);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    apiSpy.getAllocationRequests.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      throwError(null),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData));

    const subscription = service.resource$.subscribe();
    expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(0);
    assertPoll(3);
    tick(environment.apiPollingPeriod);
    expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(3);
    tick( 5 * environment.apiPollingPeriod);
    expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(3);
    service.getAll(0, pagination).subscribe();
    expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(4);
    assertPoll(3, 4);
    subscription.unsubscribe();
  }));

  function createPagination() {
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new KypoPaginatedResource([], new KypoPagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 0) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.apiPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(apiSpy.getAllocationRequests).toHaveBeenCalledTimes(calledTimes);
    }
  }
});

