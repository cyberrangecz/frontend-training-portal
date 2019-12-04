import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ArchivedTrainingRunOverviewComponent} from './archived-training-run-overview.component';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Kypo2TableModule} from 'kypo2-table';
import {PipesModule} from '../../../../../pipes/pipes.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialTestingModule} from '../../../../../testing/test-utils/material-testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ArchivedTrainingRunService} from '../../../../../services/shared/archived-training-run.service';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {TrainingRun} from '../../../../../model/training/training-run';
import {User} from 'kypo2-auth';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';

describe('ArchivedTrainingRunOverviewComponent', () => {

  let archivedTrainingRunServiceSpy: jasmine.SpyObj<ArchivedTrainingRunService>;
  let component: ArchivedTrainingRunOverviewComponent;
  let fixture: ComponentFixture<ArchivedTrainingRunOverviewComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });

  beforeEach(() => {
    archivedTrainingRunServiceSpy = jasmine.createSpyObj('ArchivedTrainingRunService', ['getAll', 'delete', 'deleteMultiple']);

    TestBed.configureTestingModule({
      declarations: [ArchivedTrainingRunOverviewComponent],
      imports: [
        BrowserTestingModule,
        HttpClientTestingModule,
        MaterialTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PipesModule,
        RouterTestingModule.withRoutes([{path: 'training-run/1/results', component: ArchivedTrainingRunOverviewComponent}]),
        Kypo2TableModule
      ],
      providers: [
        {provide: ArchivedTrainingRunService, useValue: archivedTrainingRunServiceSpy}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivedTrainingRunOverviewComponent);
    component = fixture.componentInstance;
  });
  beforeEach(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should add row to selected rows array', () => {
    component.rowSelection([
      new TrainingRunTableAdapter(createMockRun('1'), false),
    ]);
    expect(component.selectedTrainingRuns.length).toEqual(1);
  });

  it('should add multiple rows to selected rows array', () => {
    component.rowSelection([
      new TrainingRunTableAdapter(createMockRun('1'), false),
      new TrainingRunTableAdapter(createMockRun('2'), false),
      new TrainingRunTableAdapter(createMockRun('3'), false)
    ]);
    expect(component.selectedTrainingRuns.length).toEqual(3);
  });

  it('should call removal dialog on table "delete" action', () => {
    component.onArchivedTrainingRunTableAction(createTableActionEvent());
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });

  it('should call removal dialog on table "delete archived" action', () => {
    component.deleteArchivedTrainingRuns();
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });

  function createMockRun(id) {
    const run = new TrainingRun();
    run.id = id;
    run.player = new User([]);
    run.player.name = 'name';
    return run;
  }

  function createTableActionEvent() {
    const event = {
      action: {
        label: 'delete'
      },
      element: {
        trainingRun: {
          id: '1'
        }
      }
    };
    return event;
  }



});
