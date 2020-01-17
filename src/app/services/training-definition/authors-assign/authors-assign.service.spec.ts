import {async, TestBed} from '@angular/core/testing';
import {AuthorsAssignService} from './authors-assign.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {UserApi} from '../../api/user-api.service';
import {asyncData} from '../../../testing/helpers/async-data';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {Pagination} from '../../../model/table/other/pagination';
import {User} from 'kypo2-auth';
import {throwError} from 'rxjs';
import {skip, take} from 'rxjs/operators';


describe('AuthorsAssignService', () => {
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
  let facadeSpy: jasmine.SpyObj<UserApi>;
  let service: AuthorsAssignService;

  beforeEach(async(() => {
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    facadeSpy = jasmine.createSpyObj('UserFacade', ['getDesignersNotInTD', 'getAuthors', 'updateAuthors']);

    TestBed.configureTestingModule({
      providers: [
        AuthorsAssignService,
        {provide: UserApi, useValue: facadeSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy}
      ]
    });
    service = TestBed.get(AuthorsAssignService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load authors from facade (called once)', done => {
    facadeSpy.getAuthors.and.returnValue((asyncData(createMock())));
    const pagination = createPagination();
    service.getAssigned(0, pagination)
      .subscribe(_ => done(),
        fail);
    expect(facadeSpy.getAuthors).toHaveBeenCalledTimes(1);
  });

  it('should load designers from facade (called once)', done => {
    facadeSpy.getDesignersNotInTD.and.returnValue((asyncData(createMock())));
    service.getAvailableToAssign(0)
      .subscribe(_ => done(),
        fail);
    expect(facadeSpy.getDesignersNotInTD).toHaveBeenCalledTimes(1);
  });

  it('should assign designers through facade (called once)', done => {
    facadeSpy.updateAuthors.and.returnValue(asyncData(null));
    facadeSpy.getAuthors.and.returnValue((asyncData(createMock())));
    const usersToAssign = createMock().elements;
    const idsToAssign = usersToAssign.map(user => user.id);
    service.assign(0, usersToAssign).subscribe(_ => done(),
      fail);
    expect(facadeSpy.updateAuthors).toHaveBeenCalledTimes(1);
    expect(facadeSpy.updateAuthors).toHaveBeenCalledWith(0, idsToAssign, []);
  });

  it('should refresh authors after assign action', done => {
    facadeSpy.updateAuthors.and.returnValue(asyncData(null));
    facadeSpy.getAuthors.and.returnValue((asyncData(createMock())));
    const usersToAssign = createMock().elements;
    service.assign(0, usersToAssign).subscribe(_ => {
        expect(facadeSpy.getAuthors).toHaveBeenCalledTimes(1);
        done();
      },
      fail);
  });

  it('should unassign authors through facade (called once)', done => {
    facadeSpy.updateAuthors.and.returnValue(asyncData(null));
    facadeSpy.getAuthors.and.returnValue((asyncData(createMock())));
    const usersToUnassign = createMock().elements;
    const idsToUnassign = usersToUnassign.map(user => user.id);
    service.unassign(0, usersToUnassign).subscribe(_ => done(),
      fail);
    expect(facadeSpy.updateAuthors).toHaveBeenCalledTimes(1);
    expect(facadeSpy.updateAuthors).toHaveBeenCalledWith(0, [], idsToUnassign);
  });

  it('should refresh authors after unassign action', done => {
    facadeSpy.updateAuthors.and.returnValue(asyncData(null));
    facadeSpy.getAuthors.and.returnValue((asyncData(createMock())));
    const usersToUnassign = createMock().elements;
    service.unassign(0, usersToUnassign).subscribe(_ => {
        expect(facadeSpy.getAuthors).toHaveBeenCalledTimes(1);
        done();
      },
      fail);
  });

  it('should call error handler on err (getAvailableToAssign)', done => {
    facadeSpy.getDesignersNotInTD.and.returnValue((throwError(null)));
    service.getAvailableToAssign(0)
      .subscribe(_ => fail,
        err => {
        expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
        done();
    });
  });

  it('should call error handler on err (getAssigned)', done => {
    facadeSpy.getAuthors.and.returnValue((throwError(null)));
    service.getAssigned(0, null)
      .subscribe(_ => fail,
        err => {
          expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
          done();
        });
  });

  it('should call error handler on err (assign)', done => {
    facadeSpy.updateAuthors.and.returnValue((throwError(null)));
    service.assign(0, [])
      .subscribe(_ => fail,
        err => {
          expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
          done();
        });
  });

  it('should call error handler on err (unassign)', done => {
    facadeSpy.updateAuthors.and.returnValue((throwError(null)));
    service.unassign(0, [])
      .subscribe(_ => fail,
        err => {
          expect(errorHandlerSpy.display).toHaveBeenCalledTimes(1);
          done();
        });
  });

  it('should emit totalLength on getAuthors', done => {
    facadeSpy.getAuthors.and.returnValue((asyncData(createMock())));
    const pagination = createPagination();
    service.totalLength$.pipe(skip(1))
      .subscribe(emitted => {
        expect(emitted).toBe(2);
        done();
      },
        fail);
    service.getAssigned(0, pagination)
      .pipe(take(1))
      .subscribe(_ => _,
        fail);
  });

  it ('should emit hasError on err', done => {
    facadeSpy.getAuthors.and.returnValue((throwError(null)));
    const pagination = createPagination();
    service.hasError$.pipe(skip(2)) // we ignore initial value and value emitted before the call is made
      .subscribe(emitted => {
          expect(emitted).toBeTruthy();
          done();
        },
        fail);
    service.getAssigned(0, pagination)
      .pipe(take(1))
      .subscribe(fail,
        _ => _);
  });

  it('should emit next value on getAuthors', done => {
    const mockData = createMock();
    facadeSpy.getAuthors.and.returnValue((asyncData(mockData)));
    const pagination = createPagination();
    service.assignedUsers$
      .pipe(skip(1))
      .subscribe(emitted => {
          expect(emitted).toBe(mockData);
          done();
        },
        fail);
    service.getAssigned(0, pagination)
      .pipe(take(1))
      .subscribe(_ => _,
        fail);
  });

  function createPagination() {
    return new RequestedPagination(1, 5, '', '');
  }

  function createMock() {
    const user1 = new User([]);
    user1.id = 1;
    const user2 = new User([]);
    user2.id = 2;
    return new PaginatedResource([user1, user2], new Pagination(1, 2, 5, 2, 1));
  }
});
