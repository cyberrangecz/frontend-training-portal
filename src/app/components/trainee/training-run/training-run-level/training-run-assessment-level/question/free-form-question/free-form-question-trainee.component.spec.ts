import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeFormQuestionTraineeComponent } from './free-form-question-trainee.component';

describe('FreeFormQuestionTraineeComponent', () => {
  let component: FreeFormQuestionTraineeComponent;
  let fixture: ComponentFixture<FreeFormQuestionTraineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeFormQuestionTraineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeFormQuestionTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
