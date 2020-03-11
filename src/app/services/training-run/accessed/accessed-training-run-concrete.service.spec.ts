import {AccessedTrainingRunConcreteService} from './accessed-training-run-concrete.service';
import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {throwError} from 'rxjs';
import {skip} from 'rxjs/operators';
import {RequestedPagination} from 'kypo2-table';
import {RouterTestingModule} from '@angular/router/testing';

describe('AccessedTrainingRunConcreteService', () => {

  let service: AccessedTrainingRunConcreteService;
  let errorHandlerServiceSpy: jasmine.SpyObj<ErrorHandlerService>;
  let apiSpy: jasmine.SpyObj<TrainingRunApi>;

  beforeEach(async(() => {
    errorHandlerServiceSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    apiSpy = jasmine.createSpyObj('TrainingRunApi', ['getAccessed']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AccessedTrainingRunConcreteService,
        { provide: TrainingRunApi, useValue: apiSpy},
        { provide: ErrorHandlerService, useValue: errorHandlerServiceSpy},
      ],
    });
    service = TestBed.inject(AccessedTrainingRunConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    apiSpy.getAccessed.and.returnValue(throwError(null));

    service.getAll(createPagination()).subscribe(_ => fail,
  _ => {
      expect(errorHandlerServiceSpy.emit).toHaveBeenCalledTimes(1);
      done();
    });
    expect(apiSpy.getAccessed).toHaveBeenCalledTimes(1);
  });

  it('should emit hasError observable on err', done => {
    apiSpy.getAccessed.and.returnValue(throwError(null));

    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe( hasError => {
        expect(hasError).toBeTruthy();
        done();
    },
      _ => fail);
      service.getAll(createPagination()).subscribe(
        _ => fail,
        _ => done()
      );
  });

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }
});

