import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSummaryComponent } from './training-summary.component';

describe('TrainingSummaryComponent', () => {
  let component: TrainingSummaryComponent;
  let fixture: ComponentFixture<TrainingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
