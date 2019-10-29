import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {poolRequestStagesCacheBuster$, PoolRequestStagesPollingService} from './pool-request-stages-polling.service';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {asyncData} from '../../../testing/helpers/async-data';
import {skip} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {PoolCreationRequest} from '../../../model/sandbox/pool/request/pool-creation-request';
import {environment} from '../../../../environments/environment';
import {AnsibleRunStage} from '../../../model/sandbox/pool/request/stage/ansible-run-stage';
import {OpenStackStage} from '../../../model/sandbox/pool/request/stage/open-stack-stage';

describe('PoolRequestsStagesPollingService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let facadeSpy: jasmine.SpyObj<SandboxInstanceFacade>;
  let service: PoolRequestStagesPollingService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    facadeSpy = jasmine.createSpyObj('SandboxInstanceFacade', ['getRequest', 'forceStage']);
    TestBed.configureTestingModule({
      providers: [
        PoolRequestStagesPollingService,
        {provide: SandboxInstanceFacade, useValue: facadeSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.get(PoolRequestStagesPollingService);
    poolRequestStagesCacheBuster$.next();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from facade (called once)', done => {
    facadeSpy.getRequest.and.returnValue(asyncData(new PoolCreationRequest()));

    service.getAll(0, 0).subscribe(_ => done(),
      _ => fail);
    expect(facadeSpy.getRequest).toHaveBeenCalledTimes(1);
    expect(facadeSpy.getRequest).toHaveBeenCalledWith(0, 0);
  });

  it('should emit next value on update (stages observable)', done => {
    const request = createMockRequest();
    facadeSpy.getRequest.and.returnValue(asyncData(request));

    service.startPolling(0, 0);
    service.stages$
      .subscribe(emitted => {
        expect(emitted).toBe(request.stages);
        done();
        },
          _ => fail);
    service.getAll(0, 0).subscribe({error: _ => fail});
  });

  it('should call error handler on err', done => {
    facadeSpy.getRequest.and.returnValue(throwError(null));

    service.getAll(0, 0)
      .subscribe(_ => fail,
        _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should emit hasError observable on err', done => {
    facadeSpy.getRequest.and.returnValue(throwError(null));

    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe(hasError => {
        expect(hasError).toBeTruthy();
        done();
      },
      _ => fail);
    service.getAll(0, 0).subscribe(
      _ => fail,
      _ => done()
    );
  });

  it('should call facade on force cleanup', done => {
    facadeSpy.forceStage.and.returnValue(asyncData(null));
    facadeSpy.getRequest.and.returnValue(asyncData(createMockRequest()));

    service.force(0, 0, 0)
      .subscribe(_ => {
        expect(facadeSpy.forceStage).toHaveBeenCalledTimes(1);
        done();
        },
        _ => fail);
  });

  it('should update the data on force cleanup request', done => {
    facadeSpy.forceStage.and.returnValue(asyncData(null));
    facadeSpy.getRequest.and.returnValue(asyncData(createMockRequest()));

    service.force(0, 0, 0)
      .subscribe(_ => {
          expect(facadeSpy.getRequest).toHaveBeenCalledTimes(1);
          done();
        },
        _ => fail);
  });

  it('should not start polling without calling startPolling', fakeAsync(() => {
    tick(5 * environment.apiPollingPeriod);
    expect(facadeSpy.getRequest).toHaveBeenCalledTimes(0);
  }));

  it('should start polling after calling startPolling', fakeAsync(() => {
    const request = createMockRequest();
    facadeSpy.getRequest.and.returnValue(asyncData(request));

    service.startPolling(0, 0);
    const subscription = service.stages$.subscribe();
    assertPoll(5);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const request = createMockRequest();
    facadeSpy.getRequest.and.returnValues(asyncData(request), asyncData(request), throwError(null)); // throw error on third call

    service.startPolling(0, 0);
    const subscription = service.stages$.subscribe();
    assertPoll(3);
    tick(5 * environment.apiPollingPeriod);
    expect(facadeSpy.getRequest).toHaveBeenCalledTimes(3);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const request = createMockRequest();
    facadeSpy.getRequest.and.returnValues(
      asyncData(request),
      asyncData(request),
      throwError(null),
      asyncData(request),
      asyncData(request),
      asyncData(request)
    );

    service.startPolling(0, 0);
    const subscription = service.stages$.subscribe();
    assertPoll(3);
    tick(environment.apiPollingPeriod);
    expect(facadeSpy.getRequest).toHaveBeenCalledTimes(3);
    tick( 5 * environment.apiPollingPeriod);
    expect(facadeSpy.getRequest).toHaveBeenCalledTimes(3);
    service.getAll(0, 0).subscribe();
    expect(facadeSpy.getRequest).toHaveBeenCalledTimes(4);
    assertPoll(3, 4);
    subscription.unsubscribe();
  }));

  function createMockRequest() {
    const request = new PoolCreationRequest();
    request.stages = [new AnsibleRunStage(), new OpenStackStage()];
    request.stagesCount = 2;
    return request;
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 0) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.apiPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(facadeSpy.getRequest).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
