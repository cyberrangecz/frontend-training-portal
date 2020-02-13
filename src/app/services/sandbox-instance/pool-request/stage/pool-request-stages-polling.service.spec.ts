import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {PoolRequestStagesPollingService} from './pool-request-stages-polling.service';
import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {asyncData} from '../../../../testing/helpers/async-data';
import {skip} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {PoolCreationRequest} from '../../../../model/sandbox/pool/request/pool-creation-request';
import {environment} from '../../../../../environments/environment';
import {AnsibleRunStage} from '../../../../model/sandbox/pool/request/stage/ansible-run-stage';
import {OpenStackStage} from '../../../../model/sandbox/pool/request/stage/open-stack-stage';

describe('PoolRequestStagesPollingService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let facadeSpy: jasmine.SpyObj<SandboxInstanceApi>;
  let service: PoolRequestStagesPollingService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    facadeSpy = jasmine.createSpyObj('SandboxInstanceFacade', ['getCreationStages', 'forceStage']);
    TestBed.configureTestingModule({
      providers: [
        PoolRequestStagesPollingService,
        {provide: SandboxInstanceApi, useValue: facadeSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.inject(PoolRequestStagesPollingService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data from facade (called once)', done => {
    facadeSpy.getCreationStages.and.returnValue(asyncData(new PoolCreationRequest()));

    service.getAll(0, 0).subscribe(_ => done(),
      _ => fail);
    expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(1);
  });


  it('should call error handler on err', done => {
    facadeSpy.getCreationStages.and.returnValue(throwError(null));

    service.getAll(0, 0)
      .subscribe(_ => fail,
        _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should emit hasError observable on err', done => {
    facadeSpy.getCreationStages.and.returnValue(throwError(null));

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
    facadeSpy.getCreationStages.and.returnValue(asyncData(createStages()));

    service.force(0, 0, 0)
      .subscribe(_ => {
        expect(facadeSpy.forceStage).toHaveBeenCalledTimes(1);
        done();
        },
        _ => fail);
  });

  it('should update the data on force cleanup request', done => {
    facadeSpy.forceStage.and.returnValue(asyncData(null));
    facadeSpy.getCreationStages.and.returnValue(asyncData(createStages()));

    service.force(0, 0, 0)
      .subscribe(_ => {
          expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(1);
          done();
        },
        _ => fail);
  });

  it('should not start polling without calling startPolling', fakeAsync(() => {
    tick(5 * environment.apiPollingPeriod);
    expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(0);
  }));

  it('should start polling after calling startPolling', fakeAsync(() => {
    const stages = createStages();
    facadeSpy.getCreationStages.and.returnValue(asyncData(stages));

    service.startPolling(0, 0, 'CREATION');
    const subscription = service.stages$.subscribe();
    assertPoll(5);
    subscription.unsubscribe();
  }));

  it('should stop polling on error', fakeAsync(() => {
    const stages = createStages();
    facadeSpy.getCreationStages.and.returnValues(
      asyncData(stages),
      asyncData(stages),
      asyncData(stages),
      throwError(null)); // throw error on fourth period call

    service.startPolling(0, 0, 'CREATION');
    const subscription = service.stages$.subscribe();
    assertPoll(3);
    tick(5 * environment.apiPollingPeriod);
    expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(4);
    subscription.unsubscribe();
  }));

  it('should start polling again after request is successful', fakeAsync(() => {
    const stages = createStages();
    facadeSpy.getCreationStages.and.returnValues(
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

    service.startPolling(0, 0, 'CREATION');
    const subscription = service.stages$.subscribe();
    assertPoll(3);
    tick(environment.apiPollingPeriod);
    expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(4);
    tick( 5 * environment.apiPollingPeriod);
    expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(4);
    service.getAll(0, 0).subscribe();
    expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(5);
    assertPoll(3, 6);
    subscription.unsubscribe();
  }));

  function createStages() {
    return [new AnsibleRunStage(), new OpenStackStage()];
  }

  function assertPoll(times: number, initialHaveBeenCalledTimes: number = 1) {
    let calledTimes = initialHaveBeenCalledTimes;
    for (let i = 0; i < times; i++) {
      tick(environment.apiPollingPeriod);
      calledTimes = calledTimes + 1;
      expect(facadeSpy.getCreationStages).toHaveBeenCalledTimes(calledTimes);
    }
  }
});
