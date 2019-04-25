import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstancesTableComponent } from './training-instances-table.component';

describe('TrainingInstancesTableComponent', () => {
  let component: TrainingInstancesTableComponent;
  let fixture: ComponentFixture<TrainingInstancesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstancesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstancesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
