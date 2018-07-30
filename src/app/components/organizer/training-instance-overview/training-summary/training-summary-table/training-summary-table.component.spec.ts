import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSummaryTableComponent } from './training-summary-table.component';

describe('TrainingSummaryTableComponent', () => {
  let component: TrainingSummaryTableComponent;
  let fixture: ComponentFixture<TrainingSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
