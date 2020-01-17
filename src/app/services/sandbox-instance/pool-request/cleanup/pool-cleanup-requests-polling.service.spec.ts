import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {RequestedPagination} from 'kypo2-table';
import {asyncData} from '../../../../testing/helpers/async-data';
import {PaginatedResource} from '../../../../model/table/other/paginated-resource';
import {Pagination} from '../../../../model/table/other/pagination';
import {skip} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {throwError} from 'rxjs';
import {PoolCreationRequest} from '../../../../model/sandbox/pool/request/pool-creation-request';
import {poolCleanupRequestsCacheBuster$, PoolCleanupRequestsPollingService} from './pool-cleanup-requests-polling.service';

describe('PoolCleanupRequestsPollingService', () => {
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let facadeSpy: jasmine.SpyObj<SandboxInstanceApi>;
  let service: PoolCleanupRequestsPollingService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    facadeSpy = jasmine.createSpyObj('SandboxInstanceFacade', ['getCleanupRequests', 'cancelCleanupRequest', 'retryCleanupRequest']);
    TestBed.configureTestingModule({
      providers: [
        PoolCleanupRequestsPollingService,
        {provide: SandboxInstanceApi, useValue: facadeSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.get(PoolCleanupRequestsPollingService);
    poolCleanupRequestsCacheBuster$.next();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from facade (called once)', done => {
    const pagination = createPagination();
    facadeSpy.getCleanupRequests.and.returnValue(asyncData(null));

    service.getAll(0, pagination).subscribe(_ => done(),
      fail);
    expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(1);
  });

  it('should emit next value on update (request)', done => {
    const pagination = createPagination();
    const mockData = createMock();
    facadeSpy.getCleanupRequests.and.returnValue(asyncData(mockData));

    service.requests$.pipe(skip(1))
      .subscribe(emitted => {
        expect(emitted).toEqual(mockData);
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
    facadeSpy.getCleanupRequests.and.returnValue(asyncData(mockData));
    const subscription = service.requests$.pipe(skip(1))
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

  it('should call error handler on err', done => {
    const pagination = createPagination();
    facadeSpy.getCleanupRequests.and.returnValue(throwError(null));

    service.getAll(0, pagination)
      .subscribe(_ => fail,
        _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
        });
  });

  it('should emit hasError observable on err', done => {
    const pagination = createPagination();
    facadeSpy.getCleanupRequests.and.returnValue(throwError(null));
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
    const request = new PoolCreationRequest();
    request.id = 0;
    facadeSpy.getCleanupRequests.and.returnValue(asyncData(mockData));
    facadeSpy.cancelCleanupRequest.and.returnValue(asyncData(null));

    service.cancel(0, request)
      .subscribe(_ => {
        expect(facadeSpy.cancelCleanupRequest).toHaveBeenCalledTimes(1);
        done();
        },
        fail
      );
  });

  it('should update the data on cancel', done => {
    const mockData = createMock();
    const request = new PoolCreationRequest();
    request.id = 0;
    facadeSpy.getCleanupRequests.and.returnValue(asyncData(mockData));
    facadeSpy.cancelCleanupRequest.and.returnValue(asyncData(null));

    service.cancel(0, request)
      .subscribe(_ => {
        expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(1);
        done();
        },
        fail
      );
  });

  it('should start polling', fakeAsync(() => {
    const mockData = createMock();
    facadeSpy.getCleanupRequests.and.returnValue(asyncData(mockData));

    const subscription = service.requests$.subscribe();
    assertPoll(1);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const mockData = createMock();
    facadeSpy.getCleanupRequests.and.returnValues(asyncData(mockData), asyncData(mockData), throwError(null)); // throw error on third call

    const subscription = service.requests$.subscribe();
    assertPoll(3);
    tick(5 * environment.apiPollingPeriod);
    expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(3);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const pagination = createPagination();
    const mockData = createMock();
    facadeSpy.getCleanupRequests.and.returnValues(
      asyncData(mockData),
      asyncData(mockData),
      throwError(null),
      asyncData(mockData),
      asyncData(mockData),
      asyncData(mockData));

    const subscription = service.requests$.subscribe();
    expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(0);
    assertPoll(3);
    tick(environment.apiPollingPeriod);
    expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(3);
    tick( 5 * environment.apiPollingPeriod);
    expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(3);
    service.getAll(0, pagination).subscribe();
    expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(4);
    assertPoll(3, 4);
    subscription.unsubscribe();
  }));

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    return new PaginatedResource([], new Pagination(1, 0, 5, 5, 1));
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 0) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.apiPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(facadeSpy.getCleanupRequests).toHaveBeenCalledTimes(calledTimes);
    }
  }
});

