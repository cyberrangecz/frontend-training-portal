import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeFormQuestionComponent } from './free-form-question.component';

describe('FreeFormQuestionComponent', () => {
  let component: FreeFormQuestionComponent;
  let fixture: ComponentFixture<FreeFormQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeFormQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeFormQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
