import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {asyncData} from 'kypo-common';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {throwError} from 'rxjs';
import {skip, take} from 'rxjs/operators';
import {TrainingDefinitionApi} from 'kypo-training-api';
import {TrainingDefinitionOrganizerSelectorService} from './training-definition-organizer-selector.service';
import {KypoPagination} from 'kypo-common';
import {TrainingDefinitionInfo} from 'kypo-training-model';


describe('TrainingDefinitionOrganizerSelectorService', () => {
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let tdApiSpy: jasmine.SpyObj<TrainingDefinitionApi>;
  let service: TrainingDefinitionOrganizerSelectorService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    tdApiSpy = jasmine.createSpyObj('TrainingDefinitionApi', ['getAllForOrganizer']);

    TestBed.configureTestingModule({
      providers: [
        TrainingDefinitionOrganizerSelectorService,
        {provide: TrainingDefinitionApi, useValue: tdApiSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.inject(TrainingDefinitionOrganizerSelectorService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load training definitions from facade (called once)', done => {
    tdApiSpy.getAllForOrganizer.and.returnValue((asyncData(createMock())));
    const pagination = createPagination();
    service.getAll(pagination, 'RELEASED')
      .subscribe(_ => done(),
        fail);
    expect(tdApiSpy.getAllForOrganizer).toHaveBeenCalledTimes(1);
  });

  it('should call error handler on err', done => {
    tdApiSpy.getAllForOrganizer.and.returnValue((throwError(null)));
    const pagination = createPagination();
    service.getAll(pagination, 'RELEASED')
      .subscribe(_ => fail,
        err => {
          expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
          done();
        });
  });

  it ('should emit hasError on err', done => {
    tdApiSpy.getAllForOrganizer.and.returnValue((throwError(null)));
    const pagination = createPagination();
    service.hasError$.pipe(skip(2)) // we ignore initial value and value emitted before the call is made
      .subscribe(emitted => {
          expect(emitted).toBeTruthy();
          done();
        },
        fail);
    service.getAll(pagination, 'RELEASED')
      .pipe(take(1))
      .subscribe(fail,
        _ => _);
  });

  it('should emit next value on get', done => {
    const mockData = createMock();
    tdApiSpy.getAllForOrganizer.and.returnValue((asyncData(mockData)));
    const pagination = createPagination();
    service.resource$
      .pipe(
        skip(1)
      )
      .subscribe(emitted => {
          expect(emitted).toBe(mockData);
          done();
        },
        fail);

    service.getAll(pagination, 'RELEASED')
      .pipe(
        take(1)
      )
      .subscribe(_ => _,
        fail);
  });

  function createPagination() {
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMock() {
    const td1 = new TrainingDefinitionInfo();
    td1.id = 0;
    const td2 = new TrainingDefinitionInfo();
    td2.id = 1;
    return new KypoPaginatedResource([td1, td2], new KypoPagination(1, 2, 5, 2, 1));
  }
});
