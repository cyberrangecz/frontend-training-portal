import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLevelStepperComponent } from './training-level-stepper.component';

describe('TrainingLevelStepperComponent', () => {
  let component: TrainingLevelStepperComponent;
  let fixture: ComponentFixture<TrainingLevelStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingLevelStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingLevelStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
