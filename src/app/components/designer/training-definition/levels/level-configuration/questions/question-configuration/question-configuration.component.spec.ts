import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionConfigurationComponent } from './question-configuration.component';

describe('QuestionConfigurationComponent', () => {
  let component: QuestionConfigurationComponent;
  let fixture: ComponentFixture<QuestionConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
