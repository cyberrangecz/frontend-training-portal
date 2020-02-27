import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxDefinitionConcreteService} from './sandbox-definition.concrete.service';
import {SandboxDefinitionApi} from '../api/sandbox-definition-api.service';
import {throwError} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {AlertService} from '../shared/alert.service';
import {skip} from 'rxjs/operators';
import {asyncData} from '../../testing/helpers/async-data';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {Pagination} from '../../model/table/other/pagination';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

describe('SandboxDefinitionConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let SandboxDefinitionFacadeSpy: jasmine.SpyObj<SandboxDefinitionApi>;
  let alertHandlerSpy: jasmine.SpyObj<AlertService>;
  let service: SandboxDefinitionConcreteService;


  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    alertHandlerSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    SandboxDefinitionFacadeSpy = jasmine.createSpyObj('SandboxDefinitionFacade', ['getAllPaginated', 'delete', 'add']);

    TestBed.configureTestingModule({
      providers: [
        SandboxDefinitionConcreteService,
        {provide: SandboxDefinitionApi, useValue: SandboxDefinitionFacadeSpy},
        {provide: AlertService, useValue: alertHandlerSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
      ]
    });
    service = TestBed.inject(SandboxDefinitionConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    const pagination = createPagination();
    SandboxDefinitionFacadeSpy.getAllPaginated.and.returnValue(throwError(null));

    service.getAll(pagination).subscribe( _ => fail,
      _ => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      });
    expect(SandboxDefinitionFacadeSpy.getAllPaginated).toHaveBeenCalledTimes(1);
  });

  it('should emit next value on update (sandboxDefinitions)', done => {
    const pagination = createPagination();
    const mockData = createMockData();
    SandboxDefinitionFacadeSpy.getAllPaginated.and.returnValue(asyncData(mockData));

    service.resource$.pipe(skip(1))
      .subscribe(emitted => {
          expect(emitted).toBe(mockData);
          done();
        },
        fail);
    service.getAll(pagination)
      .subscribe( _ => done(),
        fail);
  });

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMockData() {
    const sandbox1 = new SandboxDefinition();
    sandbox1.id = 1;
    const sandbox2 = new SandboxDefinition();
    sandbox2.id = 2;
    return new PaginatedResource<SandboxDefinition>([sandbox1, sandbox2],
      new Pagination(1, 2, 5, 2, 1));
  }

});
