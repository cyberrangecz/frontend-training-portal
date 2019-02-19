import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunLevelComponent } from './training-run-level.component';

describe('TrainingRunLevelComponent', () => {
  let component: TrainingRunLevelComponent;
  let fixture: ComponentFixture<TrainingRunLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
