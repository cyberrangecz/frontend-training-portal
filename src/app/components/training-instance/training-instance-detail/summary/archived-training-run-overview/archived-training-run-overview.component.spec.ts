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
import {ArchivedTrainingRunService} from '../../../../../services/training-run/archived/archived-training-run.service';
import {TrainingRunRowAdapter} from '../../../../../model/table/rows/training-run-row-adapter';
import {TrainingRun} from '../../../../../model/training/training-run';
import {User} from 'kypo2-auth';

describe('ArchivedTrainingRunOverviewComponent', () => {

  let archivedTrainingRunServiceSpy: jasmine.SpyObj<ArchivedTrainingRunService>;
  let component: ArchivedTrainingRunOverviewComponent;
  let fixture: ComponentFixture<ArchivedTrainingRunOverviewComponent>;

  beforeEach(() => {
    archivedTrainingRunServiceSpy = jasmine.createSpyObj('ArchivedTrainingRunService',
      ['startPolling', 'getAll', 'delete', 'deleteMultiple']);

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

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should add row to selected rows array', () => {
    component.onRowSelection([
      new TrainingRunRowAdapter(createMockRun('1')),
    ]);
    expect(component.selectedTrainingRunIds.length).toEqual(1);
  });

  it('should add multiple rows to selected rows array', () => {
    component.onRowSelection([
      new TrainingRunRowAdapter(createMockRun('1')),
      new TrainingRunRowAdapter(createMockRun('2')),
      new TrainingRunRowAdapter(createMockRun('3'))
    ]);
    expect(component.selectedTrainingRunIds.length).toEqual(3);
  });

  function createMockRun(id): TrainingRun {
    const run = new TrainingRun();
    run.id = id;
    run.player = new User([]);
    run.player.name = 'name';
    return run;
  }
});
