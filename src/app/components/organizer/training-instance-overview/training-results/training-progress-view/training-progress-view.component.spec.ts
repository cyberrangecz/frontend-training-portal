import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgressViewComponent } from './training-progress-view.component';

describe('TrainingProgressViewComponent', () => {
  let component: TrainingProgressViewComponent;
  let fixture: ComponentFixture<TrainingProgressViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingProgressViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingProgressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
