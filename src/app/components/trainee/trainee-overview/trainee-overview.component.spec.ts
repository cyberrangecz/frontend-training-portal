import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeOverviewComponent } from './trainee-overview.component';

describe('TraineeOverviewComponent', () => {
  let component: TraineeOverviewComponent;
  let fixture: ComponentFixture<TraineeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
