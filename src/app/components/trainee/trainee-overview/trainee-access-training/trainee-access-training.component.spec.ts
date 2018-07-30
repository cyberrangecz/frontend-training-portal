import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeAccessTrainingComponent } from './trainee-access-training.component';

describe('TraineeAccessTrainingComponent', () => {
  let component: TraineeAccessTrainingComponent;
  let fixture: ComponentFixture<TraineeAccessTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeAccessTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeAccessTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
