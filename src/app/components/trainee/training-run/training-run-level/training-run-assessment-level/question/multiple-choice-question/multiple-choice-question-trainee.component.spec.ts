import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceQuestionTraineeComponent } from './multiple-choice-question-trainee.component';

describe('MultipleChoiceQuestionTraineeComponent', () => {
  let component: MultipleChoiceQuestionTraineeComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceQuestionTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceQuestionTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
