import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {RequestAllocationStagesPollingService} from './request-allocation-stages-polling.service';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {asyncData} from 'kypo-common';
import {skip} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AllocationRequest} from '../../../../model/sandbox/pool/request/allocation-request';
import {environment} from '../../../../../environments/environment';
import {AnsibleAllocationStage} from '../../../../model/sandbox/pool/request/stage/ansible-allocation-stage';
import {OpenStackAllocationStage} from '../../../../model/sandbox/pool/request/stage/open-stack-allocation-stage';
import {Request} from '../../../../model/sandbox/pool/request/request';

describe('PoolRequestStagesPollingService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let apiSpy: jasmine.SpyObj<SandboxInstanceApi>;
  let service: RequestAllocationStagesPollingService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    apiSpy = jasmine.createSpyObj('SandboxInstanceApi', ['getAllocationStages']);
    TestBed.configureTestingModule({
      providers: [
        RequestAllocationStagesPollingService,
        {provide: SandboxInstanceApi, useValue: apiSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.inject(RequestAllocationStagesPollingService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from facade (called once)', done => {
    apiSpy.getAllocationStages.and.returnValue(asyncData(new AllocationRequest()));
    const request = new AllocationRequest();
    request.id = 1;

    service.getAll(request).subscribe(_ => done(),
      _ => fail);
    expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(1);
  });


  it('should call error handler on err', done => {
    apiSpy.getAllocationStages.and.returnValue(throwError(null));
    const request = new AllocationRequest();
    request.id = 1;

    service.getAll(request)
      .subscribe(_ => fail,
        _ => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should emit hasError observable on err', done => {
    apiSpy.getAllocationStages.and.returnValue(throwError(null));
    const request = new AllocationRequest();
    request.id = 1;

    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe(hasError => {
        expect(hasError).toBeTruthy();
        done();
      },
      _ => fail);
    service.getAll(request).subscribe(
      _ => fail,
      _ => done()
    );
  });

  it('should not start polling without calling startPolling', fakeAsync(() => {
    tick(5 * environment.apiPollingPeriod);
    expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(0);
  }));

  it('should start polling after calling startPolling', fakeAsync(() => {
    const stages = createStages();
    apiSpy.getAllocationStages.and.returnValue(asyncData(stages));
    const request = new AllocationRequest();
    request.id = 1;

    service.startPolling(request);
    const subscription = service.resource$.subscribe();
    assertPoll(5);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const stages = createStages();
    apiSpy.getAllocationStages.and.returnValues(
      asyncData(stages),
      asyncData(stages),
      asyncData(stages),
      throwError(null)); // throw error on fourth period call

    const request = new AllocationRequest();
    request.id = 1;

    service.startPolling(request);
    const subscription = service.resource$.subscribe();
    assertPoll(3);
    tick(5 * environment.apiPollingPeriod);
    expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const stages = createStages();
    apiSpy.getAllocationStages.and.returnValues(
      asyncData(stages),
      asyncData(stages),
      asyncData(stages),
      throwError(null),
      asyncData(stages),
      asyncData(stages),
      asyncData(stages),
      asyncData(stages),
      asyncData(stages)
    );

    const request = new AllocationRequest();
    request.id = 1;

    service.startPolling(request);
    const subscription = service.resource$.subscribe();
    assertPoll(3);
    tick(environment.apiPollingPeriod);
    expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(4);
    tick( 5 * environment.apiPollingPeriod);
    expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(4);
    service.getAll(request).subscribe();
    expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(5);
    assertPoll(3, 6);
    subscription.unsubscribe();
  }));

  function createStages() {
    return [new AnsibleAllocationStage(), new OpenStackAllocationStage()];
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 1) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.apiPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(apiSpy.getAllocationStages).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
