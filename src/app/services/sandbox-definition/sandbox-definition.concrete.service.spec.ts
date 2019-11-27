import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxDefinitionConcreteService} from './sandbox-definition.concrete.service';
import {SandboxDefinitionFacade} from '../facades/sandbox-definition-facade.service';
import {throwError} from 'rxjs';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {AlertService} from '../shared/alert.service';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {skip} from 'rxjs/operators';
import {asyncData} from '../../testing/helpers/async-data';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {Kypo2Pagination} from '../../model/table-adapters/kypo2-pagination';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

describe('SandboxDefinitionConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let SandboxDefinitionFacadeSpy: jasmine.SpyObj<SandboxDefinitionFacade>;
  let alertHandlerSpy: jasmine.SpyObj<AlertService>;
  let service: SandboxDefinitionConcreteService;


  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    alertHandlerSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    SandboxDefinitionFacadeSpy = jasmine.createSpyObj('SandboxDefinitionFacade', ['getAllPaginated', 'delete', 'add']);

    TestBed.configureTestingModule({
      providers: [
        SandboxDefinitionConcreteService,
        {provide: SandboxDefinitionFacade, useValue: SandboxDefinitionFacadeSpy},
        {provide: AlertService, useValue: alertHandlerSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
      ]
    });
    service = TestBed.get(SandboxDefinitionConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    const pagination = createPagination();
    SandboxDefinitionFacadeSpy.getAllPaginated.and.returnValue(throwError(null));

    service.getAll(pagination).subscribe( _ => fail,
      _ => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
      });
    expect(SandboxDefinitionFacadeSpy.getAllPaginated).toHaveBeenCalledTimes(1);
  });

  it('should emit next value on update (sandboxDefinitions)', done => {
    const pagination = createPagination();
    const mockData = createMockData();
    SandboxDefinitionFacadeSpy.getAllPaginated.and.returnValue(asyncData(mockData));

    service.sandboxDefinitions$.pipe(skip(1))
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
    const sandbox1 = new SandboxDefinitionTableRow(new SandboxDefinition());
    sandbox1.id = 1;
    const sandbox2 = new SandboxDefinitionTableRow(new SandboxDefinition());
    sandbox2.id = 2;
    return new PaginatedResource<SandboxDefinitionTableRow[]>([sandbox1, sandbox2],
      new Kypo2Pagination(1, 2, 5, 2, 1));
  }

});
