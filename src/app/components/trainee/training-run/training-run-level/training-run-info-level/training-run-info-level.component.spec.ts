import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunInfoLevelComponent } from './training-run-info-level.component';

describe('TrainingRunInfoLevelComponent', () => {
  let component: TrainingRunInfoLevelComponent;
  let fixture: ComponentFixture<TrainingRunInfoLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunInfoLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunInfoLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
