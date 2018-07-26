import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInstancesListComponent } from './training-instances-list.component';

describe('TrainingInstancesListComponent', () => {
  let component: TrainingInstancesListComponent;
  let fixture: ComponentFixture<TrainingInstancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingInstancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInstancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
