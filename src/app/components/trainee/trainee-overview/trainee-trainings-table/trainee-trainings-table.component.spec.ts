import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTrainingsTableComponent } from './trainee-trainings-table.component';

describe('TraineeTrainingsTableComponent', () => {
  let component: TraineeTrainingsTableComponent;
  let fixture: ComponentFixture<TraineeTrainingsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeTrainingsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeTrainingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
