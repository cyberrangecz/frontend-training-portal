import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {Kypo2TableModule, RowAction, TableActionEvent} from 'kypo2-table';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';
import {AccessedTrainingRunConcreteService} from '../../../services/training-run/accessed/accessed-training-run-concrete.service';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {TrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {AlertService} from '../../../services/shared/alert.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {MaterialTestingModule} from '../../../testing/test-utils/material-testing.module';
import {AccessedTrainingRun} from '../../../model/table/row/accessed-training-run';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {TrainingRunApi} from '../../../services/api/training-run-api.service';
import {asyncData} from '../../../testing/helpers/async-data';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {HAMMER_LOADER} from '@angular/platform-browser';
import {TraineeAccessTrainingRunActionEnum} from '../../../model/enums/trainee-access-training-run-actions.enum';
import {Component, OnInit} from '@angular/core';
import {TrainingRunOverviewTableCreator} from '../../../model/table/factory/training-run-overview-table-creator';

let component: TrainingRunOverviewComponent;
let fixture: ComponentFixture<TrainingRunOverviewComponent>;
let trainingRunFacadeSpy: jasmine.SpyObj<TrainingRunApi>;
let trainingRunOverviewServiceSpy: jasmine.SpyObj<AccessedTrainingRunService>;
let trainingRunOverviewConcreteServiceSpy: jasmine.SpyObj<AccessedTrainingRunConcreteService>;

const routes = [
  {
    path: 'training-run/1/results',
    component: TrainingRunOverviewComponent
  },
  {
    path: 'training-run/1/game',
    component: TrainingRunOverviewComponent
  }
];

describe('TrainingRunOverviewComponent', () => {
  beforeEach(() => {

    const errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
    const activeTrainingRunServiceSpy = jasmine.createSpyObj('ActiveTrainingRunService', ['clear', 'setUpFromTrainingRun', 'access']);
    const trainingRunResolverSpy = jasmine.createSpyObj('TrainingRunResolver', ['resolve']);
    trainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunFacade', ['getAccessed', 'resume', 'access']);
    trainingRunOverviewServiceSpy = jasmine.createSpyObj('TrainingRunOverviewService', ['resume', 'load']);
    trainingRunOverviewConcreteServiceSpy = jasmine.createSpyObj('TrainingRunOverviewConcreteService', ['resume', 'load']);

    TestBed.configureTestingModule({
      declarations: [TrainingRunOverviewComponent, MockAccessTrainingRunComponent],
      imports: [
        BrowserTestingModule,
        MaterialTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        PipesModule,
        RouterTestingModule.withRoutes(routes),
        Kypo2TableModule
      ],
      providers: [
        {provide: HAMMER_LOADER, useValue: () => new Promise(() => {})},
        {provide: AccessedTrainingRunService, useValue: trainingRunOverviewServiceSpy},
        {provide: AccessedTrainingRunConcreteService, useValue: trainingRunOverviewConcreteServiceSpy},
        {provide: TrainingRunResolver, useValue: trainingRunResolverSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
        {provide: TrainingRunApi, useValue: trainingRunFacadeSpy},
        {provide: AlertService, useValue: alertServiceSpy},
        {provide: RunningTrainingRunService, useValue: activeTrainingRunServiceSpy}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingRunOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should have created the component', () => {
    expect(component).toBeDefined();
  });

  it('should call resume on table resume event', () => {
    fixture.ngZone.run(() => {
      const tableEvent = new TableActionEvent<AccessedTrainingRun>(
        mockAccessedTrainingRun(false),
        mockRow(TrainingRunOverviewTableCreator.RESUME_ACTION_ID)
      );
      const resumeSpy = spyOn(component, 'onResume').and.callThrough();

      trainingRunOverviewServiceSpy.resume.and.returnValue(asyncData(new AccessTrainingRunInfo()));
      component.onTableAction(tableEvent);
      expect(resumeSpy).toHaveBeenCalled();
    });
  });

  it('should call result on table result event', () => {
    fixture.ngZone.run(() => {
      const tableEvent = new TableActionEvent<AccessedTrainingRun>(
        mockAccessedTrainingRun(true),
        mockRow(TrainingRunOverviewTableCreator.ACCESS_RESULT_ACTION_ID)
      );
      const resultSpy = spyOn(component, 'onResults').and.callThrough();

      component.onTableAction(tableEvent);
      expect(resultSpy).toHaveBeenCalled();
    });
  });

  function mockAccessedTrainingRun(eventResult): AccessedTrainingRun {
    const accessedTrainingRunMock = new AccessedTrainingRun();
    accessedTrainingRunMock.trainingInstanceTitle = 'Title Mock';
    accessedTrainingRunMock.trainingRunId = 1;
    accessedTrainingRunMock.action = eventResult ? TraineeAccessTrainingRunActionEnum.Results : TraineeAccessTrainingRunActionEnum.Resume;
    return accessedTrainingRunMock;
  }

  function mockRow(id: string): RowAction {
    return new RowAction(id, id, 'icon', 'black', 'tooltip', of(false));
  }
});

@Component({
  selector: 'kypo2-access-training-run',
  template: `mock`
})
class MockAccessTrainingRunComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
