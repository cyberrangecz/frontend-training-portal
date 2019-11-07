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

describe('ArchivedTrainingRunOverviewComponent', () => {

  let archivedTrainingRunServiceSpy: jasmine.SpyObj<ArchivedTrainingRunService>;
  let component: ArchivedTrainingRunOverviewComponent;
  let fixture: ComponentFixture<ArchivedTrainingRunOverviewComponent>;

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
        {provide: ArchivedTrainingRunService, useValue: archivedTrainingRunServiceSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivedTrainingRunOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should have created the component', () => {
    expect(component).toBeDefined();
  });
});
