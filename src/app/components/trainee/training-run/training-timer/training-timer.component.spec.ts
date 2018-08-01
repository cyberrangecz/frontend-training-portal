import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTimerComponent } from './training-timer.component';

describe('TrainingTimerComponent', () => {
  let component: TrainingTimerComponent;
  let fixture: ComponentFixture<TrainingTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
