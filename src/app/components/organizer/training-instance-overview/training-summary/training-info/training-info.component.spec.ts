import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInfoComponent } from './training-info.component';

describe('TrainingInfoComponent', () => {
  let component: TrainingInfoComponent;
  let fixture: ComponentFixture<TrainingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
