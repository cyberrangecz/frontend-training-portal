import {TrainingRunOverviewConcreteService} from './training-run-overview.concrete.service';
import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {TrainingRunFacade} from '../facades/training-run-facade.service';
import {throwError} from 'rxjs';
import {skip} from 'rxjs/operators';

describe('TrainingRunOverviewConcreteService', () => {

  let service: TrainingRunOverviewConcreteService;
  let ErrorhandlerServiceSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
  let TrainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunFacade', ['getAccessed']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TrainingRunOverviewConcreteService,
        { provide: TrainingRunFacade, useValue: TrainingRunFacadeSpy},
        { provide: ErrorHandlerService, useValue: ErrorhandlerServiceSpy},
      ],
    });
    service = TestBed.get(TrainingRunOverviewConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    TrainingRunFacadeSpy.getAccessed.and.returnValue(throwError(null));

    service.load().subscribe( _ => fail,
  _ => {
      expect(ErrorhandlerServiceSpy.display).toHaveBeenCalledTimes(1);
      done();
    });
    expect(TrainingRunFacadeSpy.getAccessed).toHaveBeenCalledTimes(1);
  });

  it('should emit hasError observable on err', done => {
    TrainingRunFacadeSpy.getAccessed.and.returnValue(throwError(null));

    service.hasError$
      .pipe(
        skip(2) // we ignore initial value and value emitted before the call is made
      ).subscribe( hasError => {
        expect(hasError).toBeTruthy();
        done();
    },
      _ => fail);
      service.load().subscribe(
        _ => fail,
        _ => done()
      );
  });
});

