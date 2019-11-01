import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../../pipes/pipes.module';
import {Kypo2TableModule, RowAction, TableActionEvent} from 'kypo2-table';
import {TrainingRunOverviewService} from '../../../services/shared/training-run-overview.service';
import {TrainingRunOverviewConcreteService} from '../../../services/training-run/training-run-overview.concrete.service';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {TrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {AlertService} from '../../../services/shared/alert.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {MaterialTestingModule} from '../../../testing/test-utils/material-testing.module';
import {AccessedTrainingRun} from '../../../model/table-adapters/accessed-training-run';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {TrainingRunFacade} from '../../../services/facades/training-run-facade.service';
import {asyncData} from '../../../testing/helpers/async-data';
import {AccessTrainingRunInfo} from '../../../model/training/access-training-run-info';
import {HAMMER_LOADER} from '@angular/platform-browser';
import {TraineeAccessTrainingRunActionEnum} from '../../../model/enums/trainee-access-training-run-actions.enum';
import {Component, OnInit} from '@angular/core';

let component: TrainingRunOverviewComponent;
let fixture:   ComponentFixture<TrainingRunOverviewComponent>;
let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;
let alertServiceSpy: jasmine.SpyObj<AlertService>;
let activeTrainingRunServiceSpy: jasmine.SpyObj<ActiveTrainingRunService>;
let trainingRunResolverSpy: jasmine.SpyObj<TrainingRunResolver>;
let trainingRunFacadeSpy: jasmine.SpyObj<TrainingRunFacade>;
let trainingRunOverviewServiceSpy: jasmine.SpyObj<TrainingRunOverviewService>;
let trainingRunOverviewConcreteServiceSpy: jasmine.SpyObj<TrainingRunOverviewConcreteService>;

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
  errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['display']);
  alertServiceSpy = jasmine.createSpyObj('AlertService', ['emitAlert']);
  activeTrainingRunServiceSpy = jasmine.createSpyObj('ActiveTrainingRunService', ['clear', 'setUpFromTrainingRun', 'access']);
  trainingRunResolverSpy = jasmine.createSpyObj('TrainingRunResolver', ['resolve']);
  trainingRunFacadeSpy = jasmine.createSpyObj('TrainingRunFacade', ['getAccessed', 'resume', 'access']);
  trainingRunOverviewServiceSpy = jasmine.createSpyObj('TrainingRunOverviewService', ['resume', 'load']);
  trainingRunOverviewConcreteServiceSpy = jasmine.createSpyObj('TrainingRunOverviewConcreteService', ['resume', 'load']);


  beforeEach(() => {
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
        {provide: TrainingRunOverviewService, useValue: trainingRunOverviewServiceSpy},
        {provide: TrainingRunOverviewConcreteService, useValue: trainingRunOverviewConcreteServiceSpy},
        {provide: TrainingRunOverviewService, useClass: TrainingRunOverviewConcreteService},
        {provide: TrainingRunResolver, useValue: trainingRunResolverSpy},
        {provide: ErrorHandlerService, useValue: errorHandlerSpy},
        {provide: TrainingRunFacade, useValue: trainingRunFacadeSpy},
        {provide: AlertService, useValue: alertServiceSpy},
        {provide: ActiveTrainingRunService, useValue: activeTrainingRunServiceSpy}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingRunOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should have created the component', () => {
    expect(component).toBeDefined();
  });

  it('should have done initial call', () => {
    const trainingRunOverviewSpy = spyOn(component, 'loadAccessedTrainingRuns').and.callThrough();

    expect(trainingRunOverviewSpy).toHaveBeenCalledTimes(0);

    fixture.autoDetectChanges(true);

    expect(trainingRunOverviewSpy).toHaveBeenCalledTimes(1);
  });

  it('should call resume table resume event', () => {
    fixture.ngZone.run(() => {
      const tableEvent = new TableActionEvent<AccessedTrainingRun>(
        mockAccessedTrainingRun(false),
        mockRow('resume')
      );
      const resumeSpy = spyOn(component, 'onResume').and.callThrough();

      trainingRunFacadeSpy.resume.and.returnValue(asyncData(new AccessTrainingRunInfo()));
      component.onTableAction(tableEvent);
      expect(resumeSpy).toHaveBeenCalled();
    });
  });

  it('should call resume table result event', () => {
    fixture.ngZone.run(() => {

      const tableEvent = new TableActionEvent<AccessedTrainingRun>(
        mockAccessedTrainingRun(true),
        mockRow('access results')
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

  function mockRow(label: string): RowAction {
    return new RowAction(label, 'icon', 'black', 'tooltip', of(false));
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
