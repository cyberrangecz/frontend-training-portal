import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeQuestionComponent } from './trainee-question.component';

describe('TraineeQuestionComponent', () => {
  let component: TraineeQuestionComponent;
  let fixture: ComponentFixture<TraineeQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
