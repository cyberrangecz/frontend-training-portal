import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentLevelConfigurationComponent } from './assessment-level-configuration.component';

describe('AssessmentLevelConfigurationComponent', () => {
  let component: AssessmentLevelConfigurationComponent;
  let fixture: ComponentFixture<AssessmentLevelConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentLevelConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentLevelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
