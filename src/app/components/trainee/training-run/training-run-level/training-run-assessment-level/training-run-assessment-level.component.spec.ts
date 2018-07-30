import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunAssessmentLevelComponent } from './training-run-assessment-level.component';

describe('TrainingRunAssessmentLevelComponent', () => {
  let component: TrainingRunAssessmentLevelComponent;
  let fixture: ComponentFixture<TrainingRunAssessmentLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunAssessmentLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunAssessmentLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
