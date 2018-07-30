import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunResultsComponent } from './training-run-results.component';

describe('TrainingRunResultsComponent', () => {
  let component: TrainingRunResultsComponent;
  let fixture: ComponentFixture<TrainingRunResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
