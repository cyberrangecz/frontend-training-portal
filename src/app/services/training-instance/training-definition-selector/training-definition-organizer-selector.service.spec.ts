import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {asyncData} from '../../../testing/helpers/async-data';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {throwError} from 'rxjs';
import {skip, take} from 'rxjs/operators';
import {TrainingDefinitionApi} from '../../api/training-definition-api.service';
import {TrainingDefinitionOrganizerSelectorService} from './training-definition-organizer-selector.service';
import {Pagination} from '../../../model/table/other/pagination';
import {TrainingDefinitionInfo} from '../../../model/training/training-definition-info';


describe('TrainingDefinitionOrganizerSelectorService', () => {
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let tdApiSpy: jasmine.SpyObj<TrainingDefinitionApi>;
  let service: TrainingDefinitionOrganizerSelectorService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    tdApiSpy = jasmine.createSpyObj('TrainingDefinitionApi', ['getAllForOrganizer']);

    TestBed.configureTestingModule({
      providers: [
        TrainingDefinitionOrganizerSelectorService,
        {provide: TrainingDefinitionApi, useValue: tdApiSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.get(TrainingDefinitionOrganizerSelectorService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load training definitions from facade (called once)', done => {
    tdApiSpy.getAllForOrganizer.and.returnValue((asyncData(createMock())));
    const pagination = createPagination();
    service.get(pagination, 'RELEASED')
      .subscribe(_ => done(),
        fail);
    expect(tdApiSpy.getAllForOrganizer).toHaveBeenCalledTimes(1);
  });

  it('should call error handler on err', done => {
    tdApiSpy.getAllForOrganizer.and.returnValue((throwError(null)));
    const pagination = createPagination();
    service.get(pagination, 'RELEASED')
      .subscribe(_ => fail,
        err => {
          expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
          done();
        });
  });


  it('should emit totalLength on get', done => {
    tdApiSpy.getAllForOrganizer.and.returnValue((asyncData(createMock())));
    const pagination = createPagination();
    service.totalLength$
      .pipe(skip(1))
      .subscribe(emitted => {
          expect(emitted).toBe(2);
          done();
        },
        fail);
    service.get( pagination, 'RELEASED')
      .pipe(take(1))
      .subscribe(_ => _,
        fail);
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
    service.get(pagination, 'RELEASED')
      .pipe(take(1))
      .subscribe(fail,
        _ => _);
  });

  it('should emit next value on get', done => {
    const mockData = createMock();
    tdApiSpy.getAllForOrganizer.and.returnValue((asyncData(mockData)));
    const pagination = createPagination();
    service.trainingDefinition$
      .subscribe(emitted => {
          expect(emitted).toBe(mockData);
          done();
        },
        fail);
    service.get(pagination, 'RELEASED')
      .pipe(take(1))
      .subscribe(_ => _,
        fail);
  });

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    const td1 = new TrainingDefinitionInfo();
    td1.id = 0;
    const td2 = new TrainingDefinitionInfo();
    td2.id = 1;
    return new PaginatedResource([td1, td2], new Pagination(1, 2, 5, 2, 1));
  }
});
