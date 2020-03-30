import {async, TestBed} from '@angular/core/testing';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxDefinitionOverviewConcreteService} from './sandbox-definition-overview-concrete.service';
import {SandboxDefinitionApi} from 'kypo-sandbox-api';
import {throwError} from 'rxjs';
import {KypoRequestedPagination} from 'kypo-common';
import {AlertService} from '../shared/alert.service';
import {skip} from 'rxjs/operators';
import {asyncData} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPagination} from 'kypo-common';
import {SandboxDefinition} from 'kypo-sandbox-model';
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
    apiSpy = jasmine.createSpyObj('SandboxDefinitionApi', ['getAll', 'delete', 'add']);

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
    apiSpy.getAll.and.returnValue(throwError(null));

    service.getAll(pagination).subscribe( _ => fail,
      _ => {
        expect(errorHandlerSpy.emit).toHaveBeenCalledTimes(1);
        done();
      });
    expect(apiSpy.getAll).toHaveBeenCalledTimes(1);
  });

  it('should emit next value on update (sandboxDefinitions)', done => {
    const pagination = createPagination();
    const mockData = createMockData();
    apiSpy.getAll.and.returnValue(asyncData(mockData));

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
    return new KypoRequestedPagination(1, 5, '', '');
  }

  function createMockData() {
    const sandbox1 = new SandboxDefinition();
    sandbox1.id = 1;
    const sandbox2 = new SandboxDefinition();
    sandbox2.id = 2;
    return new KypoPaginatedResource<SandboxDefinition>([sandbox1, sandbox2],
      new KypoPagination(1, 2, 5, 2, 1));
  }

});
