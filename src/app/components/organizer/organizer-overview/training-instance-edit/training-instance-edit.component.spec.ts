import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstanceEditComponent } from './training-instance-edit.component';

describe('TrainingInstanceEditComponent', () => {
  let component: TrainingInstanceEditComponent;
  let fixture: ComponentFixture<TrainingInstanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
