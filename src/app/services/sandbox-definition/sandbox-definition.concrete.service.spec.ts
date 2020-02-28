import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxDefinitionOverviewConcreteService} from './sandbox-definition-overview-concrete.service';
import {SandboxDefinitionApi} from '../api/sandbox-definition-api.service';
import {throwError} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {AlertService} from '../shared/alert.service';
import {skip} from 'rxjs/operators';
import {asyncData} from '../../testing/helpers/async-data';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {Pagination} from '../../model/table/other/pagination';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';
import {MatDialog} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';

describe('SandboxDefinitionOverviewConcreteService', () => {

  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let apiSpy: jasmine.SpyObj<SandboxDefinitionApi>;
  let alertHandlerSpy: jasmine.SpyObj<AlertService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let service: SandboxDefinitionOverviewConcreteService;


  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['emit']);
    alertHandlerSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    apiSpy = jasmine.createSpyObj('SandboxDefinitionApi', ['getAllPaginated', 'delete', 'add']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SandboxDefinitionOverviewConcreteService,
        {provide: MatDialog, useValue: dialogSpy},
        {provide: SandboxDefinitionApi, useValue: apiSpy},
        {provide: AlertService, useValue: alertHandlerSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
      ]
    });
    service = TestBed.inject(SandboxDefinitionOverviewConcreteService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call error handler on err', done => {
    const pagination = createPagination();
    apiSpy.getAllPaginated.and.returnValue(throwError(null));

    service.getAll(pagination).subscribe( _ => fail,
      _ => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      });
    expect(apiSpy.getAllPaginated).toHaveBeenCalledTimes(1);
  });

  it('should emit next value on update (sandboxDefinitions)', done => {
    const pagination = createPagination();
    const mockData = createMockData();
    apiSpy.getAllPaginated.and.returnValue(asyncData(mockData));

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
