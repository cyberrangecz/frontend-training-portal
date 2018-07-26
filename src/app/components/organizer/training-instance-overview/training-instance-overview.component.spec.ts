import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';

describe('TrainingInstanceOverviewComponent', () => {
  let component: TrainingInstanceOverviewComponent;
  let fixture: ComponentFixture<TrainingInstanceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstanceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
