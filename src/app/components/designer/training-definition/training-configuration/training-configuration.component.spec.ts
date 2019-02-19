import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingConfigurationComponent } from './training-configuration.component';

describe('TrainingConfigurationComponent', () => {
  let component: TrainingConfigurationComponent;
  let fixture: ComponentFixture<TrainingConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
