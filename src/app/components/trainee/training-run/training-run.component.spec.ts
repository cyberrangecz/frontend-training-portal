import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRunComponent } from './training-run.component';

describe('TrainingRunComponent', () => {
  let component: TrainingRunComponent;
  let fixture: ComponentFixture<TrainingRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
