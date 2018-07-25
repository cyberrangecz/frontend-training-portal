import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionStepperComponent } from './question-stepper.component';

describe('QuestionStepperComponent', () => {
  let component: QuestionStepperComponent;
  let fixture: ComponentFixture<QuestionStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
